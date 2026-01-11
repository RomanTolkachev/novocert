import axios from 'axios';
import { config } from '../config';
import { refreshTokens } from './refreshTokens';

export const protectedApi = axios.create({
    baseURL: config.API_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];


// это очередь запросов к protectedApi, чтобы запросы не вызывали множественный refresh и дожидались пока рефрешнется первый failed
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

protectedApi.interceptors.request.use((config) => {

    if (!localStorage.getItem('accessToken') && !localStorage.getItem('refreshToken')) {
        return Promise.reject("отсутствуют токены")
    }

    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log({ function: "интерцептор", config })
    return config;
});

protectedApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(() => protectedApi(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) throw new Error('No refresh token');

            // console.log({
            //     function: protectedApi.name,
            //     when: "пытаемся обновить токены",
            //     refreshToken
            // })

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshTokens(refreshToken);

            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            processQueue(null, newAccessToken);
            return protectedApi(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);
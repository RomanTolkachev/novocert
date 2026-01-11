import { api } from "./axios-init"

export const refreshTokens = async (refreshToken: string): Promise<ITokens> => {

    if (!refreshToken) {
        return Promise.reject("invalid credentials (no refresh)");
    }

    try {
        const res = await api.post("/auth/refresh-session", {}, {headers: {
            "Authorization": `Bearer ${refreshToken}`
        }})

        console.log({
            function: refreshTokens.name,
            when: "пробуем получить токены в try"
        })

        if (res.status === 200) {
            console.log({
                function: refreshTokens.name,
                when: "получили обновленные токены"
            })
            return await res.data
        }
    } catch (error: any) {

        console.log({
            function: refreshTokens.name,
            when: "отработал catch"
        })

        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || `Error ${status}`;

            return Promise.reject(message);
        }

        return Promise.reject("Network error");
    }

    return Promise.reject("invalid credentials (неизвестная ошибка внутри refreshTokens)");
}
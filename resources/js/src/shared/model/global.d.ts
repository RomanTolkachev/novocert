declare global {
    interface ITokens {
        accessToken: string;
        refreshToken: string;
    }

    export interface ILaravelPaginator<T = any> {
        data: T[];
        current_page: number;
        from: number | null;
        last_page: number;
        per_page: number;
        to: number | null;
        total: number;
    }
}

export { };

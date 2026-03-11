declare global {
    interface ITokens {
        accessToken: string;
        refreshToken: string;
    }

    export interface ILaravelPaginator<T = any> {
        data: T[];
        meta: {
            current_page: number;
            from: number | null;
            last_page: number;
            per_page: number;
            to: number | null;
            total: number;
            total_organs?: number;
            total_documents?: number;
        };
    }
}

export { };

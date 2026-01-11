import { createContext } from "react";

interface IUser  {
    id?: string | number;
    name: string;
    email: string;
    role_names: string[];
}

export interface IAuthContext {
    userData: IUser | null;
    isFetched: boolean
    authenticated: boolean
    isSa: boolean
}

export const initialAuthContext: IAuthContext = {
    isFetched: false,
    authenticated: false,
    userData: null,
    isSa: false
}

export const AuthContext = createContext<IAuthContext>(initialAuthContext)
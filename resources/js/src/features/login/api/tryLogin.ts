import { api } from "../../../shared"
import type { TLoginForm } from "../model/types"

export const tryLogin = async (formData: TLoginForm) => {
    console.log(api.defaults.baseURL);
    const res = await api.post("/auth/start-session", formData, {
        withCredentials: true
    })

    return  res.data
}
import type { FC } from "react"
import { LoginForm } from "../../../features"
import styles from "./LoginPage.module.css"

export const LoginPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <LoginForm />
        </div>
    )
}
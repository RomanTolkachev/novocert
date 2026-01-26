import type { FC } from "react"
import { Routing } from "./Routing"
import { Footer, Header } from "../shared"
import { useTheme } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { OnlyAuth, OnlyUnAuth } from "./AuthProvider"
import { LoginPage } from "@/pages"

// приложение временно закрыто для просмотра без аутентификации.
// при открытии удалить обертку с routers над публичной частью
// и перенести <LoginPage /> (без обертки) в компонент Routes

export const AppLayout: FC = () => {
    const theme = useTheme()
    return (
        <Routes>
            <Route path="/*" element={
                <OnlyAuth>
                    <div style={{
                        display: 'grid',
                        gridTemplateRows: 'auto 1fr auto',
                        height: '100svh',
                        width: '100%',
                        minWidth: 0
                    }}>
                        <Header />
                        <main style={{ minHeight: 0, paddingInline: theme.spacing(2), width: "100%", minWidth: 0 }}>
                            <Routing />
                        </main>
                        <Footer />
                    </div>
                </OnlyAuth>
            } />


            <Route path="/login" element={
                <OnlyUnAuth>
                    <div style={{
                        height: '100svh',
                        width: '100%',
                    }}>
                        <LoginPage />
                    </div>
                </OnlyUnAuth>
            } />
        </Routes>
    )
}
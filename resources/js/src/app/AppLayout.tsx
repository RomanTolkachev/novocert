import type { FC } from "react"
import { Routing } from "./Routing"
import { Footer, Header } from "../shared"
import { useTheme } from "@mui/material"

export const AppLayout: FC = () => { 
    const theme = useTheme()
    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            height: '100svh',
            width: '100%',
        }}>
            <Header />
            <main style={{minHeight: 0, paddingInline: theme.spacing(2)}}>
                <Routing />
            </main>
            <Footer />
        </div>
    )
}
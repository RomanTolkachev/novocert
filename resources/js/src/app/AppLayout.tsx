import type { FC } from "react"
import { Routing } from "./Routing"
import { Footer, Header } from "../shared"

export const AppLayout: FC = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            height: '100svh',
            width: '100%',
        }}>
            <Header />
            <main style={{minHeight: 0}}>
                <Routing />
            </main>
            <Footer />
        </div>
    )
}
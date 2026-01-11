import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { ThemeModeProvider } from '../shared'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './AuthProvider/ui'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeModeProvider>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <AppLayout />
                    </AuthProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </ThemeModeProvider>
    </StrictMode>,
)

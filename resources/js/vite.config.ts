import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin';
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
    root: resolve(__dirname, 'src'),
    plugins: [
        laravel({
            input: ['app/App.tsx'],
            publicDirectory: resolve(__dirname, '../../public'),
            // buildDirectory: 'frontend',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@public': resolve(__dirname, 'public'),
        }
    },
    build: {
        // outDir: resolve(__dirname, '../../public/frontend'),  // куда собирать
        // emptyOutDir: true,
        rollupOptions: {
            input: resolve(__dirname, 'src/app/App.tsx'),  // если нужен явный entry point
        }
    }
    // server: {
    //     host: true, // фронт будет работать не только на 127.0.0.1:5173, а на всех сетевых интерфейсах
    //     port: 5173,
    //     strictPort: true, // чтобы не использовал 5174 5175 и т.д если 5173 внезапно занят
    //     watch: {
    //         // эта штука заставляет вит проактивно сканировать изменения. 
    //         // Обычно изменения отслеживаются операционной системой и вит подвязан на операционку. 
    //         // С этим флагом вит сканирует самостоятельно
    //         usePolling: true 
    //     }
    // }
})

import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use './src/_variables.scss' as *;`,
                // Suppress SCSS warnings
                quietDeps: true, // This option suppresses warnings for dependencies
            },
        },
    },
    server: {
        host: true,
        port: 777,
    },
});

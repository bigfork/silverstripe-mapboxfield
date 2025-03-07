import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
    return {
        base: "/client/dist/",
        build: {
            commonjsOptions: {
                transformMixedEsModules: true,
            },
            outDir: path.resolve(__dirname, "client/dist"),
            rollupOptions: {
                input: {
                    app: path.resolve(__dirname, "client/src/js/index.js"),
                },
                output: {
                    entryFileNames: "app.js",
                    chunkFileNames: "chunk-[name].js",
                    assetFileNames: "[name].[ext]",
                },
            },
        },
        publicDir: false,
        esbuild: {
            target: "es2019",
            minifyIdentifiers: false,
        },
    };
});

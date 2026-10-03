import adapter from "@sveltejs/adapter-node";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type PluginOption, type ServerOptions } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ mode }) => {
    const isDev = mode === "development";

    const plugins: PluginOption[] = [
        tailwindcss({
            optimize: false
        }),
        sveltekit({
            adapter: adapter({ precompress: true }),
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) => (filename.split(/[/\\]/).includes("node_modules") ? undefined : true)
            },
            preprocess: vitePreprocess()
        })
    ];

    const serverOptions: ServerOptions = {
        port: 3000,
        strictPort: true,
        host: "127.0.0.1",
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
                secure: false
            }
        }
    };

    if (!isDev) plugins.push(ViteImageOptimizer({ logStats: true }));

    return {
        build: {
            rolldownOptions: {
                checks: {
                    pluginTimings: false
                }
            }
        },
        css: {
            devSourcemap: isDev,
            transformer: "lightningcss"
        },
        json: {
            stringify: true
        },
        plugins,
        preview: serverOptions,
        server: serverOptions
    };
});

import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess(),

    kit: {
        adapter: adapter(),
        vite: {
            server: {
                hmr: {
                    // If behind a reverse proxy during development, this
                    // is the external port that HMR should try to connect
                    // to, usually the same as the HTTPS port, otherwise
                    // Vite will reload the page endlessly.
                    clientPort: process.env.DEV_PORT,
                },
            },
        },
    },
};

export default config;

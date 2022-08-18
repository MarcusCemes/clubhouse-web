import adapter from "@sveltejs/adapter-node";
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess({ postcss: true }), mdsvex({ extensions: [".md"] })],

  extensions: [".svelte", ".md"],

  kit: {
    adapter: adapter({ precompress: true }),
    prerender: { default: true },
  },
};

export default config;

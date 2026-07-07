import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_B0uT8jRC.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/404.astro.mjs');
const _page1 = () => import('./pages/impressum.astro.mjs');
const _page2 = () => import('./pages/privacy.astro.mjs');
const _page3 = () => import('./pages/_locale_/articles/_slug_.astro.mjs');
const _page4 = () => import('./pages/_locale_/articles.astro.mjs');
const _page5 = () => import('./pages/_locale_/contact.astro.mjs');
const _page6 = () => import('./pages/_locale_/cv.astro.mjs');
const _page7 = () => import('./pages/_locale_/expertise.astro.mjs');
const _page8 = () => import('./pages/_locale_/projects.astro.mjs');
const _page9 = () => import('./pages/_locale_/scripts/_slug_.astro.mjs');
const _page10 = () => import('./pages/_locale_/scripts.astro.mjs');
const _page11 = () => import('./pages/_locale_.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/404.astro", _page0],
    ["src/pages/impressum.astro", _page1],
    ["src/pages/privacy.astro", _page2],
    ["src/pages/[locale]/articles/[slug].astro", _page3],
    ["src/pages/[locale]/articles/index.astro", _page4],
    ["src/pages/[locale]/contact.astro", _page5],
    ["src/pages/[locale]/cv.astro", _page6],
    ["src/pages/[locale]/expertise.astro", _page7],
    ["src/pages/[locale]/projects.astro", _page8],
    ["src/pages/[locale]/scripts/[slug].astro", _page9],
    ["src/pages/[locale]/scripts/index.astro", _page10],
    ["src/pages/[locale]/index.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "913edf15-593e-4ef0-9f5b-ccb4cc4c70bd"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

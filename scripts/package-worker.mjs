import { mkdir, rename, writeFile } from 'node:fs/promises';

await mkdir('dist/client', { recursive: true });
await rename('dist/index.html', 'dist/client/index.html');
await rename('dist/assets', 'dist/client/assets');
await mkdir('dist/server', { recursive: true });

await writeFile(
  'dist/server/index.js',
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const url = new URL(request.url);
    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  }
};
`,
);

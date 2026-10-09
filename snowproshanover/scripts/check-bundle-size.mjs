import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const assetsPath = path.resolve('dist/assets');
const limitBytes = 180 * 1024;
const assets = await readdir(assetsPath);
const scriptFiles = assets.filter((file) => file.endsWith('.js'));
const sizes = await Promise.all(scriptFiles.map(async (file) => ({ file, size: (await stat(path.join(assetsPath, file))).size })));
const oversized = sizes.filter(({ size }) => size > limitBytes);

if (oversized.length) {
  console.error(`JavaScript bundle budget exceeded (${limitBytes} bytes): ${oversized.map(({ file, size }) => `${file}=${size}`).join(', ')}`);
  process.exit(1);
}

console.log(`Bundle budget passed: ${sizes.map(({ file, size }) => `${file}=${size}`).join(', ')}`);

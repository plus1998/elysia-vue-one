import { join } from "node:path";


console.log("[开始构建]");
const projectRoot = import.meta.dir;

/** auto-loader */
import { setBullBoardUiBasePath } from './packages/app/src/loader'
setBullBoardUiBasePath(join(projectRoot, 'build', 'bull-board'))

/** 构建web */
import { build as webBuild } from "vite";

const buildWebTag = "[构建web]";
console.time(buildWebTag);
await webBuild({
  root: join(projectRoot, "packages", "web"),
  build: {
    outDir: join(projectRoot, "build", "dist"),
  },
});
console.timeEnd(buildWebTag);

/** bun构建 */
const buildBunTag = "[构建bun]";
console.time(buildBunTag);
await Bun.$`bun build --compile --minify-whitespace --minify-syntax --target bun --outfile build/app packages/app/src/index.ts`
console.timeEnd(buildBunTag);

/** 静态bull-board */
const buildBullBoardTag = "[静态bull-board]";
console.time(buildBullBoardTag);
const originDir = join(projectRoot, "node_modules", "@bull-board", "ui");
// 复制文件夹到 build/bull-board
await Bun.$`cp -r ${originDir} build/bull-board`
console.timeEnd(buildBullBoardTag);
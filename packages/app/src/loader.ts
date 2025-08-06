/** 自动加载模块
 * 生成imports.ts
 */

import { join } from "node:path";
import { readdirSync, writeFileSync, appendFileSync } from "node:fs";

const isDev = Bun.env.NODE_ENV === "development";

const IMPORTS_PATH = join(import.meta.dir, "imports.ts");

const importDirs = ["queue", "schedule"];

writeFileSync(IMPORTS_PATH, "");

for (const importDir of importDirs) {
  const modules = readdirSync(join(import.meta.dir, importDir));
  for (const module of modules) {
    if (!module.endsWith(".ts")) {
      continue;
    }
    appendFileSync(
      IMPORTS_PATH,
      `import '${join("@backend/", importDir, module)}'\n`
    );
  }
}
export const setBullBoardUiBasePath = (path: string) => {
  appendFileSync(
    IMPORTS_PATH,
    `export const bullBoardUiBasePath = '${path}'\n`
  );
};

if (isDev) {
  appendFileSync(
    IMPORTS_PATH,
    `export const bullBoardUiBasePath = 'node_modules/@bull-board/ui'\n`
  );
}

console.log("[auto-import]");

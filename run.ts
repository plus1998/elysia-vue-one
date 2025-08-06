// runner.ts
import { SpawnOptions } from "bun";

const spawnOptions: SpawnOptions.OptionsObject<
  "inherit",
  "inherit",
  "inherit"
> = {
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
};

Bun.spawn(["bun", "run", "dev:app"], spawnOptions);
Bun.spawn(["bun", "run", "dev:web"], spawnOptions);

process.on("SIGINT", async () => {
  console.log("Cleaning up...");
});

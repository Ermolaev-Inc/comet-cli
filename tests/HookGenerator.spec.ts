import * as fs from "fs";
import { HookGenerator } from "../src/generators/HookGenerator";
import { HookPath } from "../src/paths/HookPath";
import { Generator } from "../src/generators/Generator";

const hookTemplate = `export const useStyles = () => {
  return;
};
`;

describe("HookGenerator tests", () => {
  let hookGenerator: Generator;

  beforeAll(() => {
    class MockPath implements HookPath {
      hookFile = (name: string) => `${this.hookFolder()}/${name}.hook.ts`;
      hookFolder = () => `${process.cwd()}/playground/hooks`;
    }
    hookGenerator = new HookGenerator(new MockPath());
  });

  test("standard hook generating", async () => {
    try {
      await hookGenerator.generate("http");
      await fs.promises.access(
        `${process.cwd()}/playground/hooks/http.hook.ts`,
      );
      expect(true).toBe(true);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  test("repeat standard hook generating", async () => {
    try {
      await hookGenerator.generate("http");
      await fs.promises.access(
        `${process.cwd()}/playground/hooks/http.hook.ts`,
      );
      expect(true).toBe(true);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  test("hook template", async () => {
    try {
      await hookGenerator.generate("styles");
      const content = await fs.promises.readFile(
        `${process.cwd()}/playground/hooks/styles.hook.ts`,
      );
      expect(content.toString()).toBe(hookTemplate);
    } catch (e) {
      expect(false).toBe(true);
    }
  });
});

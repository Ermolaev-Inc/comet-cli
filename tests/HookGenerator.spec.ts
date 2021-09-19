import fs from "fs/promises";
import { HookGenerator } from "../src/generators/HookGenerator";
import { Generator } from "../src/generators/Generator";
import { FakeHookPathFinder } from "./FakeHookPathFinder";

const hookTemplate = `export const useHttp = () => {
  return;
};
`;

describe("HookGenerator tests", () => {
  let hookGenerator: Generator;

  const existChecking = async () => {
    try {
      await fs.access(`${process.cwd()}/playground/hooks/http.hook.ts`);
      return true;
    } catch (e) {
      return false;
    }
  };

  beforeAll(async () => {
    hookGenerator = new HookGenerator(new FakeHookPathFinder());
    await hookGenerator.generate("http");
  });

  test("standard hook generating", async () => {
    try {
      const res = await existChecking();
      expect(res).toBe(true);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  test("hook template", async () => {
    try {
      const content = await fs.readFile(
        `${process.cwd()}/playground/hooks/http.hook.ts`,
      );
      expect(content.toString()).toBe(hookTemplate);
    } catch (e) {
      expect(false).toBe(true);
    }
  });
});

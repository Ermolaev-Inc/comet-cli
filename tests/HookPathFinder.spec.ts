import { HookPath } from "../src/paths/HookPath";
import { HookPathFinder } from "../src/paths/HookPathFinder";

describe("HookPathFinder tests", () => {
  let hookPath: HookPath;

  beforeAll(() => {
    hookPath = new HookPathFinder().generate("http");
  });

  test("correct folder path", () =>
    expect(hookPath.folder).toBe(`${process.cwd()}/src/hooks/`));

  test("correct file path", () =>
    expect(hookPath.file).toBe(`${process.cwd()}/src/hooks/http.hook.ts`));
});

import { ComponentPath } from "../src/paths/ComponentPath";
import { ComponentPathFinder } from "../src/paths/ComponentPathFinder";

describe("ComponentPathFinder tests", () => {
  let pathFinder: ComponentPath;

  beforeAll(() => {
    pathFinder = new ComponentPathFinder().generate("Button");
  });

  test("correct folder path", () =>
    expect(pathFinder.folder).toBe(`${process.cwd()}/src/components/Button`));

  test("correct file path", () =>
    expect(pathFinder.file).toBe(
      `${process.cwd()}/src/components/Button/Button.tsx`,
    ));

  test("correct styles file path", () =>
    expect(pathFinder.stylesFile).toBe(
      `${process.cwd()}/src/components/Button/Button.styles.ts`,
    ));

  test("correct index file path", () =>
    expect(pathFinder.indexFile).toBe(
      `${process.cwd()}/src/components/Button/index.ts`,
    ));
});

import { PagePath } from "../src/paths/PagePath";
import { PagePathFinder } from "../src/paths/PagePathFinder";

describe("PagePathFinder tests", () => {
  let pagePath: PagePath;

  beforeAll(() => {
    pagePath = new PagePathFinder().generate("Home");
  });

  test("correct folder path", () =>
    expect(pagePath.folder).toBe(`${process.cwd()}/src/pages/Home/`));

  test("correct container file path", () =>
    expect(pagePath.containerFile).toBe(
      `${process.cwd()}/src/pages/Home/HomeContainer.tsx`,
    ));

  test("correct file path", () =>
    expect(pagePath.file).toBe(`${process.cwd()}/src/pages/Home/Home.tsx`));

  test("correct styles file path", () =>
    expect(pagePath.stylesFile).toBe(
      `${process.cwd()}/src/pages/Home/Home.styles.ts`,
    ));
});

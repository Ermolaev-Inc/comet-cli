import { Generator } from "../src/generators/Generator";
import { PageGenerator } from "../src/generators/PageGenerator";
import * as fs from "fs";
import { FakePagePathFinder } from "./FakePagePathFinder";

const pageTemplate = `import * as S from "./Home.styles";

export const Home = () => {
  return (
    <S.Wrapper>
      <p>Component from CLI :)</p>
    </S.Wrapper>
  );
};
`;

const pageContainerTemplate = `import { Home } from "./Home";

export const HomeContainer = () => {
  return <Home />;
};
`;

const pageStylesTemplate = `import styled from "styled-components";

export const Wrapper = styled.div\`
  width: 100%;
  height: 100%;
\`;
`;

describe("PageContainer tests", () => {
  let pageGenerator: Generator;

  const existChecking = async () => {
    try {
      await fs.promises.access(`${process.cwd()}/playground/pages/Home/`);
      await fs.promises.access(
        `${process.cwd()}/playground/pages/Home/Home.tsx`,
      );
      await fs.promises.access(
        `${process.cwd()}/playground/pages/Home/HomeContainer.tsx`,
      );
      await fs.promises.access(
        `${process.cwd()}/playground/pages/Home/Home.styles.ts`,
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  beforeAll(async () => {
    pageGenerator = new PageGenerator(new FakePagePathFinder());
    await pageGenerator.generate("home");
  });

  test("standard component generating", async () => {
    try {
      const res = await existChecking();
      expect(res).toBe(true);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  test("page template", async () => {
    try {
      const content = await fs.promises.readFile(
        `${process.cwd()}/playground/pages/Home/Home.tsx`,
      );
      expect(content.toString()).toBe(pageTemplate);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  test("page container template", async () => {
    try {
      const content = await fs.promises.readFile(
        `${process.cwd()}/playground/pages/Home/HomeContainer.tsx`,
      );
      expect(content.toString()).toBe(pageContainerTemplate);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  test("page styles template", async () => {
    try {
      const content = await fs.promises.readFile(
        `${process.cwd()}/playground/pages/Home/Home.styles.ts`,
      );
      expect(content.toString()).toBe(pageStylesTemplate);
    } catch (e) {
      expect(false).toBe(true);
    }
  });
});

import { Generator } from "../src/generators/Generator";
import { ComponentPath } from "../src/paths/ComponentPath";
import { ComponentGenerator } from "../src/generators/ComponentGenerator";
import * as fs from "fs";
import { PathFinder } from "../src/paths/PathFinder";
import { ComponentPathFinder } from "../src/paths/ComponentPathFinder";
import { FakeComponentPathFinder } from "./FakeComponentPathFinder";

const componentTemplate = `import * as S from "./Button.styles";

export const Button = () => {
  return (
    <S.Wrapper>
      <p>Component</p>
    </S.Wrapper>
  );
};
`;

const componentStylesTemplate = `import styled from "styled-components";

export const Wrapper = styled.div\`
  width: 100%;
  height: 100%;
\`;
`;

const componentIndexTemplate = `import { Button } from "./Button";

export { Button };
`;

describe("ComponentGenerator tests", () => {
  let componentGenerator: Generator;

  const existChecking = async () => {
    try {
      await fs.promises.access(`${process.cwd()}/playground/components/Button`);
      await fs.promises.access(
        `${process.cwd()}/playground/components/Button/Button.tsx`,
      );
      await fs.promises.access(
        `${process.cwd()}/playground/components/Button/Button.styles.ts`,
      );
      await fs.promises.access(
        `${process.cwd()}/playground/components/Button/index.ts`,
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  beforeAll(async () => {
    componentGenerator = new ComponentGenerator(new FakeComponentPathFinder());
    await componentGenerator.generate("button");
  });

  test("standard component generating", async () => {
    try {
      const res = await existChecking();
      expect(res).toBe(true);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  test("component template", async () => {
    try {
      const content = await fs.promises.readFile(
        `${process.cwd()}/playground/components/Button/Button.tsx`,
      );
      expect(content.toString()).toBe(componentTemplate);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  test("component style template", async () => {
    try {
      const content = await fs.promises.readFile(
        `${process.cwd()}/playground/components/Button/Button.styles.ts`,
      );
      expect(content.toString()).toBe(componentStylesTemplate);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  test("component index file template", async () => {
    try {
      const content = await fs.promises.readFile(
        `${process.cwd()}/playground/components/Button/index.ts`,
      );
      expect(content.toString()).toBe(componentIndexTemplate);
    } catch (e) {
      expect(false).toBe(true);
    }
  });
});

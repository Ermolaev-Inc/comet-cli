import { Generator } from "../src/generators/Generator";
import { ComponentPath } from "../src/paths/ComponentPath";
import { ComponentGenerator } from "../src/generators/ComponentGenerator";
import * as fs from "fs";

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
      return true;
    } catch (e) {
      return false;
    }
  };

  beforeAll(async () => {
    class FakePath implements ComponentPath {
      componentsFolder = (name: string) =>
        `${process.cwd()}/playground/components/${name}`;
      componentFile = (name: string) =>
        `${this.componentsFolder(name)}/${name}.tsx`;
      componentStylesFile = (name: string) =>
        `${this.componentsFolder(name)}/${name}.styles.ts`;
    }
    componentGenerator = new ComponentGenerator(new FakePath());
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
});
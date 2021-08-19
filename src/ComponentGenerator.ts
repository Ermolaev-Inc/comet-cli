import fs from "fs";
import { Generator } from "./Generator";
import { ComponentPath } from "./ComponentPath";

const componentTemplate = (
  name: string,
) => `import * as S from "./${name}.styles";

export const ${name} = () => {
  return (
    <S.Wrapper>
      <p>Component</p>
    </S.Wrapper>
  );
};
`;

const componentStyleTemplate = () => `import styled from "styled-components";

export const Wrapper = styled.div\`
  width: 100%;
  height: 100%;
\`;
`;

export class ComponentGenerator implements Generator {
  #path: ComponentPath;

  constructor(path: ComponentPath) {
    this.#path = path;
  }

  generate = async (name: string) => {
    try {
      await fs.promises.mkdir(
        this.#path.componentsFolder(this.#formatName(name)),
        { recursive: true },
      );
      await fs.promises.writeFile(
        this.#path.componentFile(this.#formatName(name)),
        componentTemplate(this.#formatName(name)),
      );
      await fs.promises.writeFile(
        this.#path.styleComponentFile(this.#formatName(name)),
        componentStyleTemplate(),
      );
      console.log("Success");
    } catch (e) {
      console.log(e);
    }
  };

  #formatName = (name: string) =>
    `${name[0].toUpperCase()}${name.substring(1)}`;
}

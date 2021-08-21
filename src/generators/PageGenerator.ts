import { Generator } from "./Generator";
import { PagePath } from "../paths/PagePath";
import fs from "fs";

const pageContainerFileTemplate = (
  name: string,
) => `import { ${name} } from "./${name}";

export const ${name}Container = () => {
  return <${name} />;
};
`;

const pageFileTemplate = (
  name: string,
) => `import * as S from "./${name}.styles";

export const ${name} = () => {
  return (
    <S.Wrapper>
      <p>Component from CLI :)</p>
    </S.Wrapper>
  );
};
`;

const pageFileStyleTemplate = () => `import styled from "styled-components";

export const Wrapper = styled.div\`
  width: 100%;
  height: 100%;
\`;
`;

export class PageGenerator implements Generator {
  #path: PagePath;

  constructor(path: PagePath) {
    this.#path = path;
  }

  generate = async (name: string): Promise<void> => {
    const formattedName = this.#formatName(name);
    try {
      await fs.promises.mkdir(this.#path.pageFolder(formattedName), {
        recursive: true,
      });
      await fs.promises.writeFile(
        this.#path.pageContainerFile(formattedName),
        pageContainerFileTemplate(formattedName),
      );
      await fs.promises.writeFile(
        this.#path.pageFile(formattedName),
        pageFileTemplate(formattedName),
      );
      await fs.promises.writeFile(
        this.#path.pageStylesFile(formattedName),
        pageFileStyleTemplate(),
      );
      console.log("Success");
    } catch (e) {
      console.log(e);
    }
  };

  #formatName = (name: string): string =>
    `${name[0].toUpperCase()}${name.substring(1)}`;
}

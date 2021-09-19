import { Generator } from "./Generator";
import { PagePath } from "../paths/PagePath";
import fs from "fs/promises";
import { PathFinder } from "../paths/PathFinder";

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
  #pathFinder: PathFinder<PagePath>;

  constructor(pathFinder: PathFinder<PagePath>) {
    this.#pathFinder = pathFinder;
  }

  generate = async (name: string): Promise<void> => {
    const formattedName = this.#formatName(name);
    const { folder, containerFile, file, stylesFile } =
      this.#pathFinder.generate(formattedName);
    try {
      await fs.mkdir(folder, {
        recursive: true,
      });
      await fs.writeFile(
        containerFile,
        pageContainerFileTemplate(formattedName),
      );
      await fs.writeFile(file, pageFileTemplate(formattedName));
      await fs.writeFile(stylesFile, pageFileStyleTemplate());
      console.log("Success");
    } catch (e) {
      console.log(e);
    }
  };

  #formatName = (name: string): string =>
    `${name[0].toUpperCase()}${name.substring(1)}`;
}

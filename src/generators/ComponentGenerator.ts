import fs from "fs";
import { Generator } from "./Generator";
import { ComponentPath } from "../paths/ComponentPath";
import { PathFinder } from "../paths/PathFinder";

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

const componentIndexTemplate = (
  name: string,
) => `import { ${name} } from "./${name}";

export { ${name} };
`;

export class ComponentGenerator implements Generator {
  #pathFinder: PathFinder<ComponentPath>;

  constructor(pathFinder: PathFinder<ComponentPath>) {
    this.#pathFinder = pathFinder;
  }

  generate = async (name: string): Promise<void> => {
    const formattedName = this.#formatName(name);
    const paths = this.#pathFinder.generate(formattedName);
    try {
      await fs.promises.mkdir(paths.folder, {
        recursive: true,
      });
      await fs.promises.writeFile(paths.file, componentTemplate(formattedName));
      await fs.promises.writeFile(paths.stylesFile, componentStyleTemplate());
      await fs.promises.writeFile(
        paths.indexFile,
        componentIndexTemplate(formattedName),
      );
      console.log("Success");
    } catch (e) {
      console.log(e);
    }
  };

  #formatName = (name: string): string =>
    `${name[0].toUpperCase()}${name.substring(1)}`;
}

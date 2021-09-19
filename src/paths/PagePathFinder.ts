import { PathFinder } from "./PathFinder";
import { PagePath } from "./PagePath";

export class PagePathFinder implements PathFinder<PagePath> {
  generate = (name: string): PagePath => {
    const folder = `${process.cwd()}/src/pages/${name}/`;
    const file = folder + `${name}.tsx`;
    const containerFile = folder + `${name}Container.tsx`;
    const stylesFile = folder + `${name}.styles.ts`;
    return {
      folder,
      file,
      containerFile,
      stylesFile,
    };
  };
}

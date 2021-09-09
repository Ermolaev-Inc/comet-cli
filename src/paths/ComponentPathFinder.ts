import { ComponentPath } from "./ComponentPath";
import { PathFinder } from "./PathFinder";

export class ComponentPathFinder implements PathFinder<ComponentPath> {
  generate = (name: string): ComponentPath => {
    const folder = `${process.cwd()}/src/components/${name}`;
    const file = folder + `/${name}.tsx`;
    const stylesFile = folder + `/${name}.styles.ts`;
    const indexFile = folder + "/index.ts";
    return {
      folder,
      file,
      stylesFile,
      indexFile,
    };
  };
}

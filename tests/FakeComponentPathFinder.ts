import { PathFinder } from "../src/paths/PathFinder";
import { ComponentPath } from "../src/paths/ComponentPath";

export class FakeComponentPathFinder implements PathFinder<ComponentPath> {
  generate(name: string): ComponentPath {
    const folder = `${process.cwd()}/playground/components/${name}`;
    const file = folder + `/${name}.tsx`;
    const stylesFile = folder + `/${name}.styles.ts`;
    const indexFile = folder + "/index.ts";
    return {
      folder,
      file,
      stylesFile,
      indexFile,
    };
  }
}

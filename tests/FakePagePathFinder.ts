import { PathFinder } from "../src/paths/PathFinder";
import { PagePath } from "../src/paths/PagePath";

export class FakePagePathFinder implements PathFinder<PagePath> {
  generate = (name: string): PagePath => {
    const folder = `${process.cwd()}/playground/pages/Home/`;
    const containerFile = folder + `${name}Container.tsx`;
    const file = folder + `${name}.tsx`;
    const stylesFile = folder + `${name}.styles.ts`;
    return {
      folder,
      containerFile,
      file,
      stylesFile,
    };
  };
}

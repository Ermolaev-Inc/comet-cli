import { HookPath } from "./HookPath";
import { PathFinder } from "./PathFinder";

export class HookPathFinder implements PathFinder<HookPath> {
  generate = (name: string): HookPath => {
    const folder = `${process.cwd()}/src/hooks/`;
    const file = folder + `${name}.hook.ts`;
    return {
      folder,
      file,
    };
  };
}

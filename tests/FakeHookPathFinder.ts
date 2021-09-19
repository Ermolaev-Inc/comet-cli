import { HookPath } from "../src/paths/HookPath";
import { PathFinder } from "../src/paths/PathFinder";

export class FakeHookPathFinder implements PathFinder<HookPath> {
  generate = (name: string): HookPath => {
    const folder = `${process.cwd()}/playground/hooks`;
    const file = folder + `/${name}.hook.ts`;
    return {
      folder,
      file,
    };
  };
}

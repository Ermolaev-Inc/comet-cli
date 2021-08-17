import { HookPath } from "./HookPath";

export class Path implements HookPath {
  hookFolder = () => process.cwd() + "/src/hooks";
  hookFile = (name: string) => process.cwd() + `/src/hooks/${name}.hook.ts`;
}

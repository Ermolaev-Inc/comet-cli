import { HookPath } from "./HookPath";
import { ComponentPath } from "./ComponentPath";

export class Path implements HookPath, ComponentPath {
  hookFolder = () => `${process.cwd()}/src/hooks`;
  hookFile = (name: string) => process.cwd() + `/src/hooks/${name}.hook.ts`;
  componentsFolder = (name: string) =>
    `${process.cwd()}/src/components/${name}`;
  componentFile = (name: string) =>
    `${this.componentsFolder(name)}/${name}.tsx`;
  styleComponentFile = (name: string) =>
    `${this.componentsFolder(name)}/${name}.styles.ts`;
}

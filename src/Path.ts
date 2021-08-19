import { HookPath } from "./HookPath";
import { ComponentPath } from "./ComponentPath";
import { PagePath } from "./PagePath";

export class Path implements HookPath, ComponentPath, PagePath {
  hookFolder = () => `${process.cwd()}/src/hooks`;
  hookFile = (name: string) => process.cwd() + `/src/hooks/${name}.hook.ts`;
  componentsFolder = (name: string) =>
    `${process.cwd()}/src/components/${name}`;
  componentFile = (name: string) =>
    `${this.componentsFolder(name)}/${name}.tsx`;
  styleComponentFile = (name: string) =>
    `${this.componentsFolder(name)}/${name}.styles.ts`;
  pageContainerFile = (name: string) =>
    `${this.pageFolder(name)}/${name}Container.tsx`;
  pageFile = (name: string) => `${this.pageFolder(name)}/${name}.tsx`;
  pageFolder = (name: string) => `${process.cwd()}/src/pages/${name}`;
  pageStylesFile = (name: string) =>
    `${this.pageFolder(name)}/${name}.styles.ts`;
}

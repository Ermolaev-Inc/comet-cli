import { HookPath } from "./HookPath";
import { ComponentPath } from "./ComponentPath";
import { PagePath } from "./PagePath";

export class Path implements HookPath, ComponentPath, PagePath {
  hookFolder = () => `${process.cwd()}/src/hooks`;
  hookFile = (name: string) => `${this.hookFolder()}/${name}.hook.ts`;

  componentsFolder = (name: string) =>
    `${process.cwd()}/src/components/${name}`;
  componentFile = (name: string) =>
    `${this.componentsFolder(name)}/${name}.tsx`;
  componentStylesFile = (name: string) =>
    `${this.componentsFolder(name)}/${name}.styles.ts`;

  pageFolder = (name: string) => `${process.cwd()}/src/pages/${name}`;
  pageContainerFile = (name: string) =>
    `${this.pageFolder(name)}/${name}Container.tsx`;
  pageFile = (name: string) => `${this.pageFolder(name)}/${name}.tsx`;
  pageStylesFile = (name: string) =>
    `${this.pageFolder(name)}/${name}.styles.ts`;
}

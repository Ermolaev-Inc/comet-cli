import { HookPath } from "./HookPath";
import { ComponentPath } from "./ComponentPath";
import { PagePath } from "./PagePath";

export class GeneralPath implements PagePath {
  pageFolder = (name: string) => `${process.cwd()}/src/pages/${name}`;
  pageContainerFile = (name: string) =>
    `${this.pageFolder(name)}/${name}Container.tsx`;
  pageFile = (name: string) => `${this.pageFolder(name)}/${name}.tsx`;
  pageStylesFile = (name: string) =>
    `${this.pageFolder(name)}/${name}.styles.ts`;
}

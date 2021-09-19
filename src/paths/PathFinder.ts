import { ComponentPath } from "./ComponentPath";
import { HookPath } from "./HookPath";
import { PagePath } from "./PagePath";

export interface PathFinder<T extends ComponentPath | HookPath | PagePath> {
  generate: (name: string) => T;
}

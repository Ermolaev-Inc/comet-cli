import { PathFunction } from "../types/PathFunction";

export interface PagePath {
  pageFolder: PathFunction;
  pageFile: PathFunction;
  pageContainerFile: PathFunction;
  pageStylesFile: PathFunction;
}

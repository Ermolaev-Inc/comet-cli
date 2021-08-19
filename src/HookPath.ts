import { PathFunction } from "./types/PathFunction";

export interface HookPath {
  hookFolder: () => string;
  hookFile: PathFunction;
}

import { Program } from "./types/Program";

export interface Command {
  load: (program: Program) => void;
}

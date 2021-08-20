import { Command } from "./Command";
import { Program } from "../types/Program";
import {
  GeneratedEntity,
  GeneratedEntityShort,
} from "../enums/GeneratedEntity";
import { Generators } from "../generators/Generators";

export class GenerateCommand implements Command {
  #generators: Generators;

  constructor(generators: Generators) {
    this.#generators = generators;
  }

  load(program: Program): void {
    program
      .command("generate <command> [name]")
      .alias("g")
      .description("Generate something")
      .action((command: GeneratedEntity | GeneratedEntityShort, name) => {
        try {
          this.#generators[this.#fillCommandName(command)].generate(name);
        } catch (e) {
          console.log(`${command} command does not exist`);
        }
      });
  }

  #fillCommandName = (
    command: GeneratedEntity | GeneratedEntityShort,
  ): GeneratedEntity => {
    switch (command) {
      case GeneratedEntityShort.HOOK_SHORT:
        return GeneratedEntity.HOOK;
      case GeneratedEntityShort.COMPONENT_SHORT:
        return GeneratedEntity.COMPONENT;
      case GeneratedEntityShort.PAGE_SHORT:
        return GeneratedEntity.PAGE;
      default:
        return command;
    }
  };
}

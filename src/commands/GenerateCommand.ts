import { Command } from "./Command";
import { Program } from "../types/Program";
import {
  GeneratedEntity,
  GeneratedEntityFull,
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
      .command("generate <entity> [name]")
      .alias("g")
      .description("Generate entity")
      .action((entity: GeneratedEntity, name) => {
        if (!name || name.length === 0) {
          console.log("Please input correct name");
          return;
        }
        try {
          this.#generators[this.#fillEntityName(entity)].generate(name);
        } catch (e) {
          console.log(`${entity} entity does not exist`);
        }
      });
  }

  #fillEntityName = (entity: GeneratedEntity): GeneratedEntityFull => {
    switch (entity) {
      case GeneratedEntityShort.HOOK_SHORT:
        return GeneratedEntityFull.HOOK;
      case GeneratedEntityShort.COMPONENT_SHORT:
        return GeneratedEntityFull.COMPONENT;
      case GeneratedEntityShort.PAGE_SHORT:
        return GeneratedEntityFull.PAGE;
      default:
        return entity;
    }
  };
}

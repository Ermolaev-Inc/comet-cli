import { Command } from "./Command";
import { Program } from "./types/Program";
import { Generator } from "./Generator";
import { GeneratedEntity } from "./GeneratedEntity";

export interface Generators {
  [GeneratedEntity.HOOK]: Generator;
  [GeneratedEntity.COMPONENT]: Generator;
}

export class GenerateCommand implements Command {
  #hookGenerator: Generator;
  #componentGenerator: Generator;

  constructor(generators: Generators) {
    this.#hookGenerator = generators[GeneratedEntity.HOOK];
    this.#componentGenerator = generators[GeneratedEntity.COMPONENT];
  }

  load(program: Program): void {
    program
      .command("generate <schematic> [name]")
      .alias("g")
      .description("Generate something")
      .action(async (schematic, name) => {
        switch (schematic) {
          case GeneratedEntity.HOOK:
          case GeneratedEntity.HOOK_SHORT:
            await this.#hookGenerator.generate(name);
            break;
          case GeneratedEntity.COMPONENT:
          case GeneratedEntity.COMPONENT_SHORT:
            await this.#componentGenerator.generate(name);
            break;
          default:
            console.log(schematic + " command does not exist");
        }
      });
  }
}

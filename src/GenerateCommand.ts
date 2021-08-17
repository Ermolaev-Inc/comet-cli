import { Command } from "./Command";
import { Program } from "./types/Program";
import { Generator } from "./Generator";
import { GeneratedEntity } from "./GeneratedEntity";

export interface Generators {
  [GeneratedEntity.HOOK]: Generator;
}

export class GenerateCommand implements Command {
  #hookGenerator: Generator;

  constructor(generators: Generators) {
    this.#hookGenerator = generators[GeneratedEntity.HOOK];
  }

  load(program: Program): void {
    program
      .command("generate <schematic> [name]")
      .alias("g")
      .description("Generate something")
      .action((schematic, name) => {
        if (schematic === "hook") {
          this.#hookGenerator.generate(name);
        }
      });
  }
}

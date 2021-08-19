#! /usr/bin/env node
import { createCommand } from "commander";
import { Command } from "../src/commands/Command";
import { GenerateCommand } from "../src/commands/GenerateCommand";
import { Program } from "../src/types/Program";
import { HookGenerator } from "../src/generators/HookGenerator";
import { GeneralPath } from "../src/paths/GeneralPath";
import { GeneratedEntity } from "../src/enums/GeneratedEntity";
import { ComponentGenerator } from "../src/generators/ComponentGenerator";
import { version } from "../package.json";
import { PageGenerator } from "../src/generators/PageGenerator";
import { Generators } from "../src/generators/Generators";

const program = createCommand();

class App {
  readonly #program: Program;
  readonly #commands: Command[];

  constructor(program: Program, commands: Command[]) {
    this.#program = program;
    this.#commands = commands;
  }

  start = (appVersion: string) => {
    this.#program
      .version(appVersion, "-v, --version", "Comet cli version")
      .usage("<command> [options]")
      .helpOption("-h, --help", "Output usage information");
    this.#commands.forEach((command) => command.load(this.#program));
    this.#program.parse(process.argv);
  };
}

const path = new GeneralPath();

const generators: Generators = {
  [GeneratedEntity.HOOK]: new HookGenerator(path),
  [GeneratedEntity.COMPONENT]: new ComponentGenerator(path),
  [GeneratedEntity.PAGE]: new PageGenerator(path),
};
const generateCommand = new GenerateCommand(generators);

const app = new App(program, [generateCommand]);
app.start(version);

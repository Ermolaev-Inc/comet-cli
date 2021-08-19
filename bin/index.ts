#! /usr/bin/env node
import { createCommand } from "commander";
import { Command } from "../src/Command";
import { GenerateCommand, Generators } from "../src/GenerateCommand";
import { Program } from "../src/types/Program";
import { HookGenerator } from "../src/HookGenerator";
import { Path } from "../src/Path";
import { GeneratedEntity } from "../src/GeneratedEntity";
import { ComponentGenerator } from "../src/ComponentGenerator";

const program = createCommand();

class App {
  readonly #program: Program;
  readonly #commands: Command[];

  constructor(program: Program, commands: Command[]) {
    this.#program = program;
    this.#commands = commands;
  }

  start = () => {
    this.#program
      .version("1.0.0-alpha.3", "-v, --version", "Comet cli version")
      .usage("<command> [options]")
      .helpOption("-h, --help", "Output usage information");
    this.#commands.forEach((command) => command.load(this.#program));
    this.#program.parse(process.argv);
  };
}

const path = new Path();

const generators: Generators = {
  [GeneratedEntity.HOOK]: new HookGenerator(path),
  [GeneratedEntity.COMPONENT]: new ComponentGenerator(path),
};
const generateCommand = new GenerateCommand(generators);

const app = new App(program, [generateCommand]);
app.start();

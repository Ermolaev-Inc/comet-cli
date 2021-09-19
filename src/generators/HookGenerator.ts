import fs from "fs/promises";
import { Generator } from "./Generator";
import { HookPath } from "../paths/HookPath";
import { PathFinder } from "../paths/PathFinder";

const hookTemplate = (name: string) => `export const use${name} = () => {
  return;
};
`;

export class HookGenerator implements Generator {
  #pathFinder: PathFinder<HookPath>;

  constructor(pathFinder: PathFinder<HookPath>) {
    this.#pathFinder = pathFinder;
  }

  generate = async (name: string): Promise<void> => {
    const { file, folder } = this.#pathFinder.generate(name);
    try {
      await fs.mkdir(folder, { recursive: true });
      await fs.writeFile(file, hookTemplate(this.#formatName(name)));
      console.log("Success");
    } catch (e) {
      console.log(e);
    }
  };

  #formatName = (name: string): string =>
    `${name[0].toUpperCase()}${name.substring(1)}`;
}

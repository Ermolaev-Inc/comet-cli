import fs from "fs";
import { Generator } from "./Generator";
import { HookPath } from "./HookPath";

const hookTemplate = (name: string) => `export const use${name} = () => {
  return;
};
`;

export class HookGenerator implements Generator {
  #path: HookPath;

  constructor(path: HookPath) {
    this.#path = path;
  }

  generate = async (name: string): Promise<void> => {
    try {
      await fs.promises.mkdir(this.#path.hookFolder(), { recursive: true });
      await fs.promises.writeFile(
        this.#path.hookFile(name),
        hookTemplate(this.#formatName(name)),
      );
      console.log("Success");
    } catch (e) {
      console.log(e);
    }
  };

  #formatName = (name: string): string =>
    `${name[0].toUpperCase()}${name.substring(1)}`;
}

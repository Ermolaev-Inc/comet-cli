import fs from "fs";
import { Generator } from "./Generator";
import { HookPath } from "./HookPath";

export const hookTemplate = (name: string) => `export const use${name} = () => {
  return;
};
`;

export class HookGenerator implements Generator {
  #path: HookPath;

  constructor(path: HookPath) {
    this.#path = path;
  }

  generate = (name: string) => {
    fs.mkdir(this.#path.hookFolder(), { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      fs.writeFile(
        this.#path.hookFile(name),
        hookTemplate(this.#formatName(name)),
        (err) => {
          if (err) {
            throw err;
          }
          console.log("Success");
        },
      );
    });
  };

  #formatName = (name: string) =>
    `${name[0].toUpperCase()}${name.substring(1)}`;
}

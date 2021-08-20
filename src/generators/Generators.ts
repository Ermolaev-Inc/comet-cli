import { GeneratedEntityFull } from "../enums/GeneratedEntity";
import { Generator } from "./Generator";

export interface Generators {
  [GeneratedEntityFull.HOOK]: Generator;
  [GeneratedEntityFull.COMPONENT]: Generator;
  [GeneratedEntityFull.PAGE]: Generator;
}

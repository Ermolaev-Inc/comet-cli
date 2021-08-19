import { GeneratedEntity } from "../enums/GeneratedEntity";
import { Generator } from "./Generator";

export interface Generators {
  [GeneratedEntity.HOOK]: Generator;
  [GeneratedEntity.COMPONENT]: Generator;
  [GeneratedEntity.PAGE]: Generator;
}

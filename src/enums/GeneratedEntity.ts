export enum GeneratedEntityFull {
  "HOOK" = "hook",
  "COMPONENT" = "component",
  "PAGE" = "page",
}

export enum GeneratedEntityShort {
  "HOOK_SHORT" = "h",
  "COMPONENT_SHORT" = "c",
  "PAGE_SHORT" = "p",
}

export type GeneratedEntity = GeneratedEntityFull | GeneratedEntityShort;

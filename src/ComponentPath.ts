export interface ComponentPath {
  componentsFolder: (name: string) => string;
  componentFile: (name: string) => string;
  styleComponentFile: (name: string) => string;
}

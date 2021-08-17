export interface HookPath {
  hookFolder: () => string;
  hookFile: (name: string) => string;
}

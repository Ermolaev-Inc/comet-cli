/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleFileExtensions: ["js", "ts"],
  rootDir: "./tests",
  testRegex: ".spec.ts",
  preset: "ts-jest",
  testEnvironment: "node",
};

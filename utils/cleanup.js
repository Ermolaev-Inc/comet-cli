// eslint-disable-next-line @typescript-eslint/no-var-requires
const rimraf = require("rimraf");

class Cleanup {
  start = () => {
    rimraf(`${process.cwd()}/playground`, () => {
      console.log("Success");
    });
  };
}

const cleanup = new Cleanup();
cleanup.start();

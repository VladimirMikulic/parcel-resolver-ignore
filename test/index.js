const test = require("node:test");
const { execSync } = require('child_process');

test('Building demo project', async () => {
  process.chdir("./test/demo");
  execSync("../../node_modules/.bin/parcel build index.html")
});

const fs = require('fs');
const path = require('path');
const { Resolver } = require('@parcel/plugin');

const pkgJSONPath = path.join(process.cwd(), 'package.json');
const pkgJSON = JSON.parse(fs.readFileSync(pkgJSONPath));
const regexpPatterns = pkgJSON.parcelIgnore || [];

module.exports = new Resolver({
  async resolve({ filePath }) {
    const shouldExcludeFile = regexpPatterns.some(pattern =>
      new RegExp(pattern).test(filePath)
    );

    if (shouldExcludeFile) {
      console.log(`Skipped ${filePath}`);
      return { isExcluded: true }
    };
    return null;
  }
});

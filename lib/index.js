const fs = require('fs');
const path = require('path');
const { Resolver } = require('@parcel/plugin');

const pkgJSONPath = path.join(process.cwd(), 'package.json');
const pkgJSON = JSON.parse(fs.readFileSync(pkgJSONPath));
const getPatterns = function (config = []) {
  if ("dev" in config || "prod" in config) {
    return (
      (process.env.NODE_ENV === "development" ? config.dev : config.prod) || []
    );
  } else {
    return config;
  }
};

const regexpPatterns = getPatterns(pkgJSON.parcelIgnore);

module.exports = new Resolver({
  async resolve({ specifier }) {
    const shouldExcludeFile = regexpPatterns.some(pattern =>
      new RegExp(pattern).test(specifier)
    );

    if (shouldExcludeFile) {
      console.log(`Skipped ${specifier}`);
      return { isExcluded: true };
    }

    return null;
  }
});

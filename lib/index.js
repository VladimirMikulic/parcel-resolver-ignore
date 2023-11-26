const fs = require('fs');
const path = require('path');
const { Resolver } = require('@parcel/plugin');

module.exports = new Resolver({
  async loadConfig({ config }) {
    const pkgJSONPath = path.join(process.cwd(), 'package.json');
    const pkgJSON = JSON.parse(fs.readFileSync(pkgJSONPath));

    const { parcelIgnore = [] } = pkgJSON;
    const regexpPatterns = Array.isArray(parcelIgnore)
      ? parcelIgnore
      : parcelIgnore[process.env.NODE_ENV] || [];

    config.invalidateOnFileChange(pkgJSONPath);

    return regexpPatterns;
  },
  async resolve({ specifier, config: regexpPatterns }) {
    const shouldExcludeFile = regexpPatterns.some(pattern =>
      new RegExp(pattern).test(specifier)
    );

    if (shouldExcludeFile) {
      console.log(`Skipped ${specifier}`);
      return { isExcluded: true };
    }

    return null;
  },
});

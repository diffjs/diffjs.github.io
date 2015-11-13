const ncp = require('ncp');

module.exports = (assetDir) => {
  return (files, metalsmith, done) => {
    const sourceDir = assetDir || metalsmith.path('assets');
    ncp(
      sourceDir,
      metalsmith.destination(),
      done
    );
  };
};

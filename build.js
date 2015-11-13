const path = require('path');

const Metalsmith = require('metalsmith');

// Plugins
const collections = require('metalsmith-collections');
const feed = require('metalsmith-feed');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const more = require('metalsmith-more');
const pagination = require('metalsmith-pagination');
const prism = require('metalsmith-prism');

const assets = require('./plugins/assets');

// Helpers
const moment = require('moment');

// Data
const siteData = require('./site.json');

const metalsmith = new Metalsmith(__dirname);

metalsmith
  .source(path.join(__dirname, 'src'))
  .destination(path.join(__dirname, 'build'))
  .metadata({
    site: siteData,
    moment,
  })
  .use(markdown())
  .use(layouts({
    engine: 'jade',
    basedir: path.join(__dirname, 'layouts'),
  }))
  .use(assets());

console.time('Build complete');
metalsmith.build((error) => {
  if (error) {
    return console.error(error);
  }

  console.timeEnd('Build complete');
});

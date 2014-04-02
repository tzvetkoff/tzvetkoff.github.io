#!/usr/bin/env node

var
  fs = require('fs'),
  cssProcessor = require('clean-css'),
  jsProcessor = require('uglify-js'),
  cssConfig = {
    keepSpecialComments     : 0,
    keepBreaks              : false,
    debug                   : false,
  },
  jsConfig = {
    fromString              : true,
    copyright               : false,
    comments                : false,
    bracketize              : true,
    indent_level            : 2,
    unused                  : false,
  };

function css(source) {
  return new cssProcessor(cssConfig).minify(source);
}
function js(source) {
  return jsProcessor.minify(source, jsConfig);
}
function read(filename) {
  return fs.readFileSync(filename).toString();
}
function write(filename, contents) {
  return fs.writeFileSync(filename, contents)
}

var
  jsDev   = read('assets/javascripts/main.js'),
  jsMin   = js(jsDev, jsConfig).code,

  ieDev   = read('assets/javascripts/ie.js'),
  ieMin   = js(ieDev, jsConfig).code,

  cssDev  = read('assets/stylesheets/main.css'),
  cssMin  = css(cssDev, cssConfig),

  synDev  = read('assets/stylesheets/syntax.css'),
  synMin  = css(synDev, cssConfig);

write('assets/javascripts/main.min.js', jsMin);
write('assets/javascripts/ie.min.js', ieMin);
write('assets/stylesheets/main.min.css', cssMin);
write('assets/stylesheets/syntax.min.css', synMin);

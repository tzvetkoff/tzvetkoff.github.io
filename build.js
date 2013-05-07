#!/usr/bin/env node

var
  fs = require('fs'),
  css = require('clean-css').process,
  js = require('uglify-js').minify,

  cssConfig = {
    keepSpecialComments     : 0,
    keepBreaks              : false,
    removeEmpty             : true,
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

function fileRead(filename) {
  return fs.readFileSync(filename).toString();
}
function fileWrite(filename, contents) {
  return fs.writeFileSync(filename, contents)
}

var
  ieDev           = fileRead('assets/javascripts/ie.js'),
  ieMin           = js(ieDev, jsConfig).code,

  cssDev          = fileRead('assets/stylesheets/main.css'),
  cssMin          = css(cssDev, cssConfig),

  synDev          = fileRead('assets/stylesheets/syntax.css'),
  synMin          = css(synDev, cssConfig);

fileWrite('assets/javascripts/ie.min.js', ieMin);
fileWrite('assets/stylesheets/main.min.css', cssMin);
fileWrite('assets/stylesheets/syntax.min.css', synMin);

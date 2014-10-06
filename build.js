#!/usr/bin/env node

var
  fs = require('fs'),
  jsProcessor = require('uglify-js'),
  jsConfig = {
    fromString              : true,
    copyright               : false,
    comments                : false,
    bracketize              : true,
    indent_level            : 2,
    unused                  : false,
  };

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
  jsMin   = js(jsDev, jsConfig).code;

write('assets/javascripts/main.min.js', jsMin);

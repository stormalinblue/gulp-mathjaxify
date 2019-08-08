# gulp-mathjaxify

A simple [`gulp`](https://gulpjs.com) plugin to statically render your math expressions in larger documents using gulp. Specifically, a wrapper around [`mathjax-node-page`](https://www.npmjs.com/package/mathjax-node-page).

[![Build Status](https://travis-ci.org/stormalinblue/gulp-mathjaxify.svg?branch=master)](https://travis-ci.org/stormalinblue/gulp-mathjaxify)

## Installation

`gulp-mathjaxify` has not been published yet.

## Usage

Import `mathjaxify` from `gulp-mathjaxify` and then call `mathjaxify` in a gulp pipe with the appropriate `mathjax-node-page` [options](https://www.npmjs.com/package/mathjax-node-page#usage).

```javascript
// gulpfile.js

const { src, dest } = require("gulp");
const { mathjaxify } = require("gulp-mathjaxify");

// Use mathjax-node-page options
// Refer to https://www.npmjs.com/package/mathjax-node-page#usage

// Render equations as html
src("./src/*.html")
    .pipe(mathjaxify({ output: "html" }))
    .pipe(dest("./dist/"))

// Render equations as svg
// Interpret single-dollar expressions as inline expressions
src("./src/*.html")
    .pipe(mathjaxify({ output: "svg", singleDollars: true }))
    .pipe(dest("./dist/"))
```

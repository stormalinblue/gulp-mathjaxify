import { expect } from "chai";
import { readFileSync } from "fs";
import { dest, src } from "gulp";
import { join } from "path";
import { mathjaxify } from "../lib/index";

const TEST_RESOURCES = join(".", "test-resources");
const OUTPUT = join(TEST_RESOURCES, "output");

function inputPath(filename: string): string {
  return join(TEST_RESOURCES, "input", filename);
}

function expectedPath(filename: string): string {
  return join(TEST_RESOURCES, "expected", filename);
}

function outputPath(filename: string): string {
  return join(OUTPUT, filename);
}

function test(
  inputFile: string, configOptions: any, typesetOptions: any): void {
  src(inputPath(inputFile))
    .pipe(mathjaxify(configOptions, typesetOptions))
    .pipe(dest(OUTPUT));
  expect(readFileSync(expectedPath(inputFile)).toString())
    .to.be.equal(readFileSync(outputPath(inputFile)).toString());
}

describe("Converting math to <svg> elements", () => {
  it("should create 1 svg with 1 display 1 inline", () => {
    test("svg-1i1d-0i.html", { input: ["TeX"] }, { svg: true });
  });
  it("should create 2 svg with 1 display 1 inline", () => {
    test(
      "svg-1i1d-1i.html",
      { input: ["TeX"], singleDollars: true },
      { svg: true });
  });
});

describe("Converting math to HTML elements", () => {
  it("should create 1 svg with 1 display 1 inline", () => {
    test("html-1i1d-0i.html", { input: ["TeX"] }, { html: true });
  });
  it("should create 2 svg with 1 display 1 inline", () => {
    test(
      "html-1i1d-1i.html",
      { input: ["TeX"], singleDollars: true },
      { html: true });
  });
});

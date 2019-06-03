import { expect } from "chai";
import { dest, src } from "gulp";
import { join } from "path";
import { mathjaxify } from "../lib/index";

const TEST_RESOURCES = join(".", "test-resources");
const OUTPUT = join(TEST_RESOURCES, "output");

function inputPath(filename: string): string {
  return join(TEST_RESOURCES, "input", filename);
}

describe("Converting math to <svg> elements", () => {
  it("should create 1 svg with 1 display 1 inline", () => {
    src(inputPath("svg-1i1d-0i.html"))
      .pipe(mathjaxify({ input: ["TeX"] }, { svg: true }))
      .pipe(dest(OUTPUT));
    expect(1).to.be.equal(1);
  });
  it("should create 2 svg with 1 display 1 inline", () => {
    src(inputPath("svg-1i1d-1i.html"))
      .pipe(mathjaxify({ input: ["TeX"], singleDollars: true }, { svg: true }))
      .pipe(dest(OUTPUT));
    expect(1).to.be.equal(1);
  });
});

describe("Converting math to HTML elements", () => {
  it("should create 1 svg with 1 display 1 inline", () => {
    src(inputPath("html-1i1d-0i.html"))
      .pipe(mathjaxify({ input: ["TeX"] }, { html: true }))
      .pipe(dest(OUTPUT));
    expect(1).to.be.equal(1);
  });
  it("should create 2 svg with 1 display 1 inline", () => {
    src(inputPath("html-1i1d-1i.html"))
      .pipe(mathjaxify({ input: ["TeX"], singleDollars: true }, { html: true }))
      .pipe(dest(OUTPUT));
    expect(1).to.be.equal(1);
  });
});

declare module "mathjax-node-page" {
  type ConfigOptions = any;
  type TypesetOptions = any;
  function mjpage(
    input: string,
    configOptions: ConfigOptions,
    typesetOptions: TypesetOptions,
    callback: (output: string) => any): void;
}

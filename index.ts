import { mjpage } from "mathjax-node-page";
import { Readable, Transform, TransformCallback } from "stream";
import * as Vinyl from "vinyl";

/**
 * Gulp plugin for mathjax-node-page
 * @param mjpageConfig Page config options to be passed to mathjax-node-page
 * @param mjnodeConfig MathJax-node config options to be passed to
 *                     mathjax-node-page
 */
export function mathjaxify(mjpageConfig?, mjnodeConfig?): Transform {
  const transformStream: Transform = new Transform({ objectMode: true });

  const pageConfig = mjpageConfig || {};
  const nodeConfig = mjnodeConfig || {};

  transformStream._transform = (
    file: Vinyl, encoding, callback: TransformCallback) => {
    if (file.isNull()) {
      transformStream.push(file);
      callback();
      return;
    }

    if (file.isBuffer()) {
      convert(
        file,
        file.contents.toString(encoding),
        pageConfig,
        nodeConfig,
        transformStream,
        callback);

      return;
    }

    if (file.isStream()) {
      streamConvert(
        file,
        file.contents as Readable,
        pageConfig,
        nodeConfig,
        transformStream,
        callback);
    }
  };

  return transformStream;
}

/**
 * Handles string input into mathjax-node-page
 * @param file The Vinyl file to convert
 * @param body The body text of the Vinyl file
 * @param pageConfig Page config options to be passed to mathjax-node-page
 * @param nodeConfig MathJax-node config options to be passed to
 *                   mathjax-node-page
 * @param transform Transform stream to output to
 * @param callback Callback to call after finishing
 */
function convert(
  file: Vinyl,
  body: string,
  pageConfig,
  nodeConfig,
  transform: Transform,
  callback: TransformCallback) {

  mjpage(body, pageConfig, nodeConfig, (output) => {
    file.contents = Buffer.from(output);
    transform.push(file);
    callback();
  });
}

/**
 * Handles Stream input into mathjax-node-page
 * @param file Vinyl file to convert
 * @param stream Stream to collect body text from
 * @param pageConfig Page config options to be passed to mathjax-node-page
 * @param nodeConfig MathJax-node config options to be passed to
 *                   mathjax-node-page
 * @param transform Transform stream to output to
 * @param callback Callback to call after finishing
 */
async function streamConvert(
  file: Vinyl,
  stream: Readable,
  pageConfig,
  nodeConfig,
  transform: Transform,
  callback: TransformCallback) {

  const body = (await streamReader(stream));
  convert(file, body, pageConfig, nodeConfig, transform, callback);
}

/**
 * Helper function to collect stream into a string
 * @param stream Stream to collect string from
 * @param encoding Encoding of the stream
 */
async function streamReader(
  stream: Readable, encoding?: BufferEncoding): Promise<string> {

  encoding = encoding || "utf-8";
  const chunks = [];
  return new Promise<string>((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString(encoding)));
  });
}

import { SDKName } from "./config";
import debug from "debug";

/**
 * Default request options.
 * @type {{config: {}, method: string, url: string, body: null, params: {}, headers: {}}}
 */
const defaultOpts = {
  config: {},
  method: "",
  url: "",
  body: null,
  params: {},
  headers: {}
};

export default class Request {
  constructor(opts = defaultOpts) {
    this._debug = debug(`${SDKName}:request`);
    this._opts = opts;
  }

  /**
   * toHTTP converts the request to an HTTP request.
   * @returns {method: string, uri: string, headers: ...}
   * @private
   */
  _toHTTP() {
    this._debug("converting to http request");
    return {
      method: this._opts.method.toUpperCase(),
      uri: this._opts.url,
      headers: {
        ...this._opts.headers,
        "Content-Type": this._opts.config.contentType,
        Accept: this._opts.config.contentType,
        "User-Agent": this._opts.config.userAgent
      },
      qs: this._opts.params,
      body: this._opts.body || this.body,
      timeout: this._opts.config.httpTimeout,
      json: true,
      resolveWithFullResponse: true
    };
  }
}

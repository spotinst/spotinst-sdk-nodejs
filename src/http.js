import {SDKName} from './config';
import request from 'request-promise';
import debug from 'debug';

// HttpClient is a HTTP request client with Promise support.
export default class HttpClient {
  constructor() {
    this._debug = debug(`${SDKName}:http`);
  }

  /**
   * do runs a request using the underlying HTTP client.
   * @param req
   * @returns {*}
   */
  do(req) {
    this._debug('making http request');
    return request(req).promise();
  }
}
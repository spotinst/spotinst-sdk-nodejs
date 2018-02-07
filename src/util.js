import {SDKName} from './config';
import debug from 'debug';

class Util {
  constructor() {
    this._debug = debug(`${SDKName}:util`);
  }

  isValid(name, value, callback, reject) {
    this._debug(`validating field ${name}=${value}`);
    if (!value || value.toString().length === 0) {
      const error = new Error(`spotinst-sdk-nodejs: invalid or missing field value (${name}=${value})`);
      this.rejectOnFailure(error.toString(), callback, reject);
      return false;
    }
    this._debug(`field ${name}=${value} validated`);
    return true;
  }

  resolveOnSuccess(resp, callback, resolve) {
    typeof callback === 'function' ?
      callback(null, resp) :
      resolve(resp);
  }

  rejectOnFailure(err, callback, reject) {
    typeof callback === 'function' ?
      callback(err) :
      reject(err);
  }
}

export default new Util();
import { SDKName } from './config';
import debug from 'debug';

class Util {
  constructor() {
    this._debug = debug(`${SDKName}:util`);
  }

  hasValidResourceId(id, callback, reject) {
    this._debug('validating resource id=', id);
    if (!id || id.length === 0) {
      const error = new Error('spotinst-sdk-nodejs: invalid or malformed resource id');
      this.rejectOnFailure(error.toString(), callback, reject);
      return false;
    }
    this._debug(`resource id=${id} validated`);
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
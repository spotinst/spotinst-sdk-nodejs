import {SDKName} from '../config';
import util from '../util';
import debug from 'debug';

export default class AwsSpotService {
  constructor(client) {
    this._debug = debug(`${SDKName}:aws_spot`);
    this._client = client;
    this._basePath = '/aws/ec2/spot';
  }

  /**
   * read describes a specific Spot Instance Request.
   * @param params
   * @returns {Promise}
   */
  read(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!util.isValid('id', params.id, callback, reject)) return;
      this._debug('initiating a new read request, id=', params.id);
      const req = this._client._newRequest('GET', `${this._basePath}/${params.id}`);
      this._debug('making read request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          util.resolveOnSuccess(res.response.items, callback, resolve);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          util.rejectOnFailure(err.toString(), callback, reject);
        });
    });
  }
}
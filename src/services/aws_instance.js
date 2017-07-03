import { SDKName } from '../config';
import util from '../util';
import debug from 'debug';

export default class AwsInstanceService {
  constructor(client) {
    this._debug    = debug(`${SDKName}:aws_instance`);
    this._client   = client;
    this._basePath = '/aws/ec2/instance';
  }

  /**
   * read describes a specific instance.
   * @param params
   * @returns {Promise}
   */
  read(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug('initiating a new read request, id=', params.id);
      if (!util.hasValidResourceId(params.id, callback, reject)) return;
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

  /**
   * detach detaches a specific instance from an existing group.
   * @param params
   * @returns {Promise}
   */
  detach(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug('initiating a new detach request, params=', params);
      this._debug('preparing body');
      const body = Object.assign({}, params);
      this._debug('body=', body);
      const req = this._client._newRequest('PUT', `${this._basePath}/detach`, body);
      this._debug('making detach request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          util.resolveOnSuccess(null, callback, resolve);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          util.rejectOnFailure(err.toString(), callback, reject);
        });
    });
  }
  
  /**
   * signal notifies about the state of a specific instance.
   * @param params
   * @returns {Promise}
   */
  signal(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug('initiating a new signal request, params=', params);
      this._debug('preparing body');
      const body = Object.assign({}, params);
      this._debug('body=', body);
      const req = this._client._newRequest('POST', `${this._basePath}/signal`, body);
      this._debug('making signal request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          util.resolveOnSuccess(null, callback, resolve);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          util.rejectOnFailure(err.toString(), callback, reject);
        });
    });
  }
}

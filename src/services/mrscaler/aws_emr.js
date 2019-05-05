import {SDKName} from '../../config';
import util from '../../util';
import debug from 'debug';

export default class MrScalerAwsService {
  constructor(client) {
    this._debug = debug(`${SDKName}:mrscaler_aws`);
    this._client = client;
    this._basePath = '/aws/emr/mrScaler';
  }

  /**
   * list describes all MR Scalers.
   * @param params
   * @returns {Promise}
   */
  list(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug('initiating a new list request');
      const req = this._client._newRequest('GET', this._basePath);
      this._debug('making list request');
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
   * create creates a new mrscaler.
   * @param params
   * @returns {Promise}
   */
  create(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!params.mrScaler) {
        params = {mrScaler: {...params}};
      }
      this._debug('initiating a new create request');
      this._debug('preparing body');
      const body = {mrScaler: Object.assign({}, params.mrScaler)};
      this._debug('body=', body);
      const req = this._client._newRequest('POST', this._basePath, body);
      this._debug('making create request');
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
   * read describes a specific mrscaler.
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

  /**
   * update updates an existing mrScaler.
   * @param params
   * @returns {Promise}
   */
  update(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!params.mrScaler) {
        params = {mrScaler: {...params}};
      }
      this._debug('initiating a new update request, id=', params.mrScaler.id);
      this._debug('preparing body');
      const body = {mrScaler: Object.assign({}, params.mrScaler)};
      delete body.mrScaler.id;
      this._debug('body=', body);
      const req = this._client._newRequest('PUT', `${this._basePath}/${params.mrScaler.id}`, body);
      this._debug('making update request');
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
   * delete deletes an existing mrscaler.
   * @param params
   * @returns {Promise}
   */
  delete(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!util.isValid('id', params.id, callback, reject)) return;
      this._debug('initiating a new delete request, id=', params.id);
      const req = this._client._newRequest('DELETE', `${this._basePath}/${params.id}`);
      this._debug('making delete request');
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
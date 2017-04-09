import { SDKName } from '../config';
import debug from 'debug';

export default class AwsGroupService {
  constructor(client) {
    this._debug    = debug(`${SDKName}:aws_group`);
    this._client   = client;
    this._basePath = '/aws/ec2/group';
  }

  /**
   * list describes all the groups.
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
          typeof callback === 'function' ?
            callback(null, res.response.items) :
            resolve(res.response.items);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          typeof callback === 'function' ?
            callback(err.toString()) :
            reject(err.toString());
        });
    });
  }

  /**
   * create creates a new group.
   * @param params
   * @returns {Promise}
   */
  create(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!params.group) { params = { group: { ...params } }; }
      this._debug('initiating a new create request');
      this._debug('preparing body');
      const body = {group: Object.assign({}, params.group)};
      this._debug('body=', body);
      const req = this._client._newRequest('POST', this._basePath, body);
      this._debug('making create request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          typeof callback === 'function' ?
            callback(null, res.response.items) :
            resolve(res.response.items);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          typeof callback === 'function' ?
            callback(err.toString()) :
            reject(err.toString());
        });
    });
  }

  /**
   * read describes a specific group.
   * @param params
   * @returns {Promise}
   */
  read(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug('initiating a new read request, id=', params.id);
      const req = this._client._newRequest('GET', `${this._basePath}/${params.id}`);
      this._debug('making read request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          typeof callback === 'function' ?
            callback(null, res.response.items) :
            resolve(res.response.items);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          typeof callback === 'function' ?
            callback(err.toString()) :
            reject(err.toString());
        });
    });
  }

  /**
   * update updates an existing group.
   * @param params
   * @returns {Promise}
   */
  update(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!params.group) { params = { group: { ...params } }; }
      this._debug('initiating a new update request, id=', params.group.id);
      this._debug('preparing body');
      const body = {group: Object.assign({}, params.group)};
      delete body.group.id;
      this._debug('body=', body);
      const req = this._client._newRequest('PUT', `${this._basePath}/${params.group.id}`, body);
      this._debug('making update request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          typeof callback === 'function' ?
            callback(null, res.response.items) :
            resolve(res.response.items);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          typeof callback === 'function' ?
            callback(err.toString()) :
            reject(err.toString());
        });
    });
  }

  /**
   * delete deletes an existing group.
   * @param params
   * @returns {Promise}
   */
  delete(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug('initiating a new delete request, id=', params.id);
      const req = this._client._newRequest('DELETE', `${this._basePath}/${params.id}`);
      this._debug('making delete request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          typeof callback === 'function' ?
            callback(null, res.response.items) :
            resolve(res.response.items);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          typeof callback === 'function' ?
            callback(err.toString()) :
            reject(err.toString());
        });
    });
  }

  /**
   * status describes the current status of a specific group.
   * @param params
   * @returns {Promise}
   */
  status(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug('initiating a new status request, id=', params.id);
      const req = this._client._newRequest('GET', `${this._basePath}/${params.id}/status`);
      this._debug('making status request');
      this._client._requireOK(this._client._doRequest(req))
        .then((res) => {
          this._debug('promise resolved');
          typeof callback === 'function' ?
            callback(null, res.response.items) :
            resolve(res.response.items);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          typeof callback === 'function' ?
            callback(err.toString()) :
            reject(err.toString());
        });
    });
  }
}
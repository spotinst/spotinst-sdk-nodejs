import { SDKName } from "../../config";
import util from "../../util";
import debug from "debug";

export default class PatternService {
  constructor(client) {
    this._debug = debug(`${SDKName}:endpoint:pattern`);
    this._client = client;
    this._basePath = "/functions/pattern";
  }

  /**
   * read describes a specific endpoint.
   * @param params
   * @returns {Promise}
   */
  read(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug(
        "initiating a new read endpoint request, id=",
        params.resourceId
      );
      const url = `${this._basePath}/${params.patternId}?accountId=${params.accountId}`;
      const req = this._client._newRequest("GET", url);
      this._debug("making read endpoint request");
      this._client
        ._requireOK(this._client._doRequest(req))
        .then(res => {
          this._debug("promise resolved");
          util.resolveOnSuccess(res.response.items, callback, resolve);
        })
        .catch(err => {
          this._debug("promise rejected", err);
          util.rejectOnFailure(err.toString(), callback, reject);
        });
    });
  }

  /**
   * list describes a list of endpoints.
   * @param params
   * @returns {Promise}
   */
  list(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug("initiating a new list endpoints request");
      const url = `${this._basePath}?accountId=${params.accountId}&environmentId=${params.environmentId}`;
      const req = this._client._newRequest("GET", url);
      this._debug("making list endpoints request");
      this._client
        ._requireOK(this._client._doRequest(req))
        .then(res => {
          this._debug("promise resolved");
          util.resolveOnSuccess(res.response.items, callback, resolve);
        })
        .catch(err => {
          this._debug("promise rejected", err);
          util.rejectOnFailure(err.toString(), callback, reject);
        });
    });
  }

  /**
   * create a new endpoint.
   * @param params
   * @returns {Promise}
   */
  create(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug("initiating a new create endpoint request, params=", params);
      this._debug("preparing body");
      const body = { pattern: Object.assign({}, params) };
      this._debug("body=", body);
      const req = this._client._newRequest(
        "POST",
        `${this._basePath}?accountId=${params.accountId}`,
        body
      );
      this._debug("making create endpoint request");
      this._client
        ._requireOK(this._client._doRequest(req))
        .then(res => {
          this._debug("promise resolved");
          util.resolveOnSuccess(res.response.items[0], callback, resolve);
        })
        .catch(err => {
          this._debug("promise rejected", err);
          util.rejectOnFailure(err.toString(), callback, reject);
        });
    });
  }

  /**
   * update an existing endpoint.
   * @param params
   * @returns {Promise}
   */
  update(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug("initiating a new update endpoint request, id=", params.id);
      this._debug("preparing body");
      const body = { pattern: Object.assign({}, params) };
      this._debug("body=", body);
      delete body.pattern.accountId;
      delete body.pattern.environmentId;
      delete body.pattern.id;
      const req = this._client._newRequest(
        "PUT",
        `${this._basePath}/${params.id}?accountId=${params.accountId}`,
        body
      );
      this._debug("making update endpoint request");
      this._client
        ._requireOK(this._client._doRequest(req))
        .then(res => {
          this._debug("promise resolved");
          util.resolveOnSuccess(res.response.items, callback, resolve);
        })
        .catch(err => {
          this._debug("promise rejected", err);
          util.rejectOnFailure(err.toString(), callback, reject);
        });
    });
  }

  /**
   * delete an existing endpoint.
   * @param params
   * @returns {Promise}
   */
  delete(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!util.isValid("id", params.id, callback, reject)) return;
      this._debug("initiating a new delete request, id=", params.id);
      const req = this._client._newRequest(
        "DELETE",
        `${this._basePath}/${params.id}?accountId=${params.accountId}`
      );
      this._debug("making delete endpoint request");
      this._client
        ._requireOK(this._client._doRequest(req))
        .then(res => {
          this._debug("promise resolved");
          util.resolveOnSuccess(res.response.items, callback, resolve);
        })
        .catch(err => {
          this._debug("promise rejected", err);
          util.rejectOnFailure(err.toString(), callback, reject);
        });
    });
  }
}

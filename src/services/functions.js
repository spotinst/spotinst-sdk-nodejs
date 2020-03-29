import { SDKName } from "../config";
import util from "../util";
import debug from "debug";

export default class FunctionsService {
  constructor(client) {
    this._debug = debug(`${SDKName}:functions`);
    this._client = client;
    this._basePath = "/functions/function";
  }

  /**
   * read describes a specific function.
   * @param params
   * @returns {Promise}
   */
  read(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug("initiating a new read function request, id=", params.id);
      if (!util.isValid("id", params.id, callback, reject)) return;
      const url = `${this._basePath}/${params.id}?environmentId=${params.environmentId}&accountId=${params.accountId}`;
      const req = this._client._newRequest("GET", url);
      this._debug("making read function request");
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
   * list describes a list of functions.
   * @param params
   * @returns {Promise}
   */
  list(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug("initiating a new list functions request");
      const url = `${this._basePath}?environmentId=${params.environmentId}&accountId=${params.accountId}`;
      const req = this._client._newRequest("GET", url);
      this._debug("making list functions request");
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
   * create a function.
   * @param params
   * @returns {Promise}
   */
  create(params = {}, callback) {
    return new Promise((resolve, reject) => {
      this._debug("initiating a new create function request, params=", params);
      this._debug("preparing body");
      const body = Object.assign({}, params);
      this._debug("body=", body);
      const req = this._client._newRequest(
        "POST",
        `${this._basePath}?accountId=${body.function.accountId}`,
        body
      );
      this._debug("making create function request");
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
   * update an existing function.
   * @param params
   * @returns {Promise}
   */
  update(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!params.function) {
        params = { function: { ...params } };
      }
      this._debug(
        "initiating a new update function request, id=",
        params.function.id
      );
      this._debug("preparing body");
      const body = { function: Object.assign({}, params.function) };
      delete body.function.id;
      this._debug("body=", body);
      const req = this._client._newRequest(
        "PUT",
        `${this._basePath}/${params.function.id}?accountId=${body.function.accountId}`,
        body
      );
      this._debug("making update function request");
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
   * delete an existing function.
   * @param params
   * @returns {Promise}
   */
  delete(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!util.isValid("id", params.id, callback, reject)) return;
      this._debug("initiating a new delete function request, id=", params.id);
      const req = this._client._newRequest(
        "DELETE",
        `${this._basePath}/${params.id}?accountId=${params.accountId}`
      );
      this._debug("making delete function request");
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
   * getting logs of afunction.
   * @param params
   * @returns {Promise}
   */
  logs(params = {}, callback) {
    return new Promise((resolve, reject) => {
      let startTime;
      const body = { function: Object.assign({}, params.function) };
      if (
        !util.isValid("functionId", body.function.functionId, callback, reject)
      )
        return;
      if (body.function.startTime && body.function.startTime instanceof Date) {
        startTime = body.function.startTime;
      } else {
        startTime = new Date(Date.now() - 5 * 60000);
      }
      this._debug(
        "initiating get function logs request. id=",
        body.function.functionId
      );
      const req = this._client._newRequest(
        "GET",
        `${
          this._basePath
        }/log?from=${startTime.getTime()}&to=${Date.now()}&accountId=${
          body.function.accountId
        }&functionId=${body.function.functionId}`
      );
      this._debug("making get function logs request");
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

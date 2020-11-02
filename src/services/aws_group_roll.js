import { SDKName } from "../config";
import util from "../util";
import debug from "debug";

export default class AwsGroupRollService {
  constructor(client) {
    this._debug = debug(`${SDKName}:aws_group_roll`);
    this._client = client;
    this._basePath = `/aws/ec2/group`;
  }

  /**
   * list describes all the rolling deployments.
   * @param params
   * @returns {Promise}
   */
  list(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!util.isValid("groupId", params.groupId, callback, reject)) return;
      this._debug("initiating a new list rolls request");
      const req = this._client._newRequest(
        "GET",
        `${this._basePath}/${params.groupId}/roll`
      );
      this._debug("making list rolls request");
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
   * read describes a specific rolling deployment.
   * @param params
   * @returns {Promise}
   */
  read(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!util.isValid("groupId", params.groupId, callback, reject)) return;
      if (!util.isValid("rollId", params.rollId, callback, reject)) return;
      this._debug("initiating a new read roll request, id=", params.id);
      const req = this._client._newRequest(
        "GET",
        `${this._basePath}/${params.groupId}/roll/${params.rollId}`
      );
      this._debug("making read roll request");
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
   * start starts a new rolling deployment.
   * @param params
   * @returns {Promise}
   */
  start(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!util.isValid("groupId", params.groupId, callback, reject)) return;
      this._debug("initiating a new start roll request, id=", params.id);
      const req = this._client._newRequest(
        "PUT",
        `${this._basePath}/${params.groupId}/roll`
      );
      this._debug("making start roll request");
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
   * stop stops an existing rolling deployment.
   * @param params
   * @returns {Promise}
   */
  stop(params = {}, callback) {
    return new Promise((resolve, reject) => {
      if (!util.isValid("groupId", params.groupId, callback, reject)) return;
      if (!util.isValid("rollId", params.rollId, callback, reject)) return;
      this._debug("initiating a new stop roll request, id=", params.id);
      const req = this._client._newRequest(
        "PUT",
        `${this._basePath}/${params.groupId}/roll/${params.rollId}`
      );
      this._debug("making stop roll request");
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

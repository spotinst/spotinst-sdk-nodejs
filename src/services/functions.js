import { SDKName } from '../config';
import util from '../util';
import debug from 'debug';

export default class FunctionsService {
	constructor(client) {
		this._debug    = debug(`${SDKName}:functions`);
		this._client   = client;
		this._basePath = '/functions/function';
	}

	/**
	 * read describes a specific function.
	 * @param params
	 * @returns {Promise}
	 */
	read(params = {}, callback) {
		return new Promise((resolve, reject) => {
			this._debug('initiating a new read request, id=', params.id);
			if (!util.hasValidResourceId(params.id, callback, reject)) return;

			const url = `${this._basePath}/${params.id}?environmentId=${params.environmentId}`;
			const req = this._client._newRequest('GET', url);
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
	 * readAll describes a list of functions.
	 * @param params
	 * @returns {Promise}
	 */
	list(params = {}, callback) {
		return new Promise((resolve, reject) => {
			this._debug('initiating a new readAll request');

			const url = `${this._basePath}?environmentId=${params.environmentId}`;
			const req = this._client._newRequest('GET', url);
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
	 * create a function.
	 * @param params
	 * @returns {Promise}
	 */
	create(params = {}, callback) {
		return new Promise((resolve, reject) => {
			this._debug('initiating a new create function request, params=', params);
			this._debug('preparing body');
			const body = Object.assign({}, params);
			this._debug('body=', body);
			const req = this._client._newRequest('POST', `${this._basePath}?accountId=${body.function.accountId}`, body);
			this._debug('making create function request');
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

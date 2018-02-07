import * as config from './config';
import Request from './request';
import AwsGroupService from './services/aws_group';
import AwsInstanceService from './services/aws_instance';
import AwsSpotService from './services/aws_spot';
import SubscriptionService from './services/subscription';
import FunctionsService from './services/functions';
import SpectrumService from './services/spectrum';
import EndpointService from './services/endpoints';
import debug from 'debug';

export default class Client {
  constructor(...opts) {
    this._debug  = debug(`${config.SDKName}:client`);
    this._config = this._defaultConfig();
    for (let opt of opts) {
      opt.call(this, this._config);
    }
    this.AwsGroupService     = new AwsGroupService(this);
    this.AwsInstanceService  = new AwsInstanceService(this);
    this.AwsSpotService      = new AwsSpotService(this);
    this.SubscriptionService = new SubscriptionService(this);
    this.FunctionsService    = new FunctionsService(this);
	  this.SpectrumService   	 = new SpectrumService(this);
    this.EndpointService     = new EndpointService(this);
  }

  /**
   * _defaultConfig returns the default configuration for the client.
   * @returns {{apiAddress, oauthAddress, scheme, userAgent, contentType, httpClient}}
   * @private
   */
  _defaultConfig() {
    return {
      apiAddress:   config.DefaultAPIAddress,
      oauthAddress: config.DefaultOAuthAddress,
      scheme:       config.DefaultScheme,
      userAgent:    config.DefaultUserAgent,
      contentType:  config.DefaultContentType,
      httpClient:   config.DefaultHttpClient,
      httpTimeout:  config.DefaultHttpTimeout,
    };
  }

  /**
   * _newRequest is used to create a new request.
   * @param method
   * @param path
   * @param body
   * @param params
   * @returns {Request}
   * @private
   */
  _newRequest(method, path, body, params = {}) {
    if (!method || !method.length) {
      throw new Error('spotinst-sdk-nodejs: invalid or malformed method');
    }

    if (!path || !path.length) {
      throw new Error('spotinst-sdk-nodejs: invalid or malformed path');
    }

    var options = {
      config: this._config,
      url:    `${this._config.scheme}://${this._config.apiAddress}${path}`,
      method,
      body,
      params,
    };

    if (this._config.credentials) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${this._config.credentials.token}`,
      };
    }

    var request = new Request(options);
    return request;
  }

  /**
   * _doRequest runs a request with our client.
   * @param request
   * @returns {Promise}
   * @private
   */
  _doRequest(request) {
    return new Promise((resolve, reject) => {
      this._debug('converting to http request');
      const req = request._toHTTP();
      this._dumpRequest(req);
      this._debug('calling http client');
      return this._config.httpClient.do(req)
        .then((res) => {
          this._debug('promise resolved');
          this._dumpResponse(res);
          resolve(res);
        })
        .catch((err) => {
          this._debug('promise rejected', err);
          reject(err.toString());
        });
    });
  }

  /**
   * _requireOK is used to verify response status code is a successful one.
   * @param request
   * @returns {Promise}
   * @private
   */
  _requireOK(request) {
    return new Promise((resolve, reject) => {
      request
        .then(res => {
          (/^2/.test('' + res.statusCode)) ?
            resolve(res.body) : reject(res);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * _dumpRequest dumps the given HTTP request to the trace log.
   * @param request
   * @private
   */
  _dumpRequest(request) {
    try {
      this._debug('request:', request);
    } catch (err) {
    }
  }

  /**
   * _dumpResponse dumps the given HTTP response to the trace log.
   * @param response
   * @private
   */
  _dumpResponse(response) {
    try {
      this._debug('response:', JSON.stringify(response.toJSON(), null, 2));
    } catch (err) {
    }
  }
}

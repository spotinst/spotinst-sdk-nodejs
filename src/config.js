import * as pkg from "../package.json";
import HttpClient from "./http";

// SDKName is the name of the SDK.
export const SDKName = pkg.name;

// SDKVersion is the current version of the SDK.
export const SDKVersion = pkg.version;

// DefaultAPIAddress is the default address of the Spotinst API.
// It is used e.g. when initializing a new Client without a specific address.
export const DefaultAPIAddress = "api.spotinst.io";

// DefaultOAuthAddress is the default address of the Spotinst OAuth API.
// It is used e.g. when initializing a new Client without a specific address.
export const DefaultOAuthAddress = "oauth.spotinst.io";

// DefaultScheme is the default protocol scheme to use when making HTTP
// calls.
export const DefaultScheme = "https";

// DefaultContentType is the default content type to use when making HTTP
// calls.
export const DefaultContentType = "application/json";

// DefaultUserAgent is the default user agent to use when making HTTP
// calls.
export const DefaultUserAgent = SDKName + "/" + SDKVersion;

// DefaultHttpClient is the default HTTP client to use when making HTTP calls.
export const DefaultHttpClient = new HttpClient();

// DefaultHttpTimeout is the default number of milliseconds to wait for
// a server to send response headers (and start the response body) before
// aborting the request. Defaults to 120 seconds.
export const DefaultHttpTimeout = 120 * 1000;

/**
 * setAPIAddress defines the address of the Spotinst API.
 * @param addr
 * @returns {Function}
 */
export function setAPIAddress(addr) {
  return function(config) {
    config.apiAddress = addr;
  };
}

/**
 * setOAuthAddress defines the address of the Spotinst OAuth API.
 * @param addr
 * @returns {Function}
 */
export function setOAuthAddress(addr) {
  return function(config) {
    config.oauthAddress = addr;
  };
}

/**
 * setScheme defines the scheme for the address of the Spotinst API.
 * @param scheme
 * @returns {Function}
 */
export function setScheme(scheme) {
  return function(config) {
    config.scheme = scheme;
  };
}

/**
 * setHttpClient defines the HTTP client.
 * @param client
 * @returns {Function}
 */
export function setHttpClient(client) {
  return function(config) {
    config.httpClient = client;
  };
}

/**
 * setHttpTimeout defines the HTTP timeout.
 * @param msec
 * @returns {Function}
 */
export function setHttpTimeout(msec) {
  return function(config) {
    config.httpTimeout = msec;
  };
}

/**
 * setToken defines the authorization token.
 * @param token
 * @returns {Function}
 */
export function setToken(token) {
  return function(config) {
    config.credentials = { token };
  };
}

/**
 * setAccount defines the account to operate against.
 * @param accountId
 * @returns {Function}
 */
export function setAccount(accountId) {
  return function(config) {
    config.accountId = accountId;
  };
}

/**
 * setUserAgent defines the user agent.
 * @param ua
 * @returns {Function}
 */
function setUserAgent(ua) {
  return function(config) {
    config.userAgent = `${ua}+${config.userAgent}`;
  };
}

/**
 * setContentType defines the content type.
 * @param ct
 * @returns {Function}
 */
function setContentType(ct) {
  return function(config) {
    config.contentType = ct;
  };
}

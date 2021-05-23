function queryStringify(params: any) {
  if (!params) {
    return;
  }
  return Object.entries(params).reduce((acc, entry, index) => {
    const [param, value] = entry;
    const encoded = index === 0 ? `${param}=${encodeURIComponent(value as string)}` : `&${param}=${encodeURIComponent(value as string)}`;
    return `${acc}${encoded}`;
  }, "");
}

function createURL(url: string, params: any, baseUrl: string) {
  const uri = url.startsWith("http") ? url : baseUrl + url;
  if (!params) {
    return uri;
  }
  return `${uri}?${queryStringify(params)}`;
}

const codeList = {
  200: "The request has succeeded.",
  201: "Created.",
  202: "Accepted.",
  203: "Non-Authoritative Information.",
  204: "No Content.",
  400: "Bad Request.",
  401: "Unauthorized.",
  403: "Forbidden. The request was valid, but the server is refusing action",
  404: "The requested resource could not be found.",
  500: "Internal Server Error.",
  503: "The server is currently unavailable."
};

function getSuccessCode(code: number) {
  const Success = codeList[code] || "Unknown Success";
  return `Success ${code} ${Success}`;
}

function getErrorCode(code: number) {
  const error = codeList[code] || "Unknown failure";
  return `Error ${code} ${error}`;
}

function getReq(baseUrl: string, url: string, method: string, params?: any, body?: any, token?: string) {
  const uri = createURL(url, params, baseUrl);
  const opt: any = {};
  opt.method = method;
  opt.headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });
  if (token) {
    opt.headers.append("Authorization", "Bearer " + token);
  }
  if (body) {
    opt.body = JSON.stringify(body);
  }
  return fetch(uri, opt)
    .then((response) => {
      const type = response.headers.get("content-type") || "";
      if (response.ok && type.includes("json")) {
        return response.json().then((json) => {
          return {
            data: json,
            response: response,
            message: `${getSuccessCode(response.status)} ${response.statusText}`
          };
        });
      } else if (response.status < 300) {
        return {
          data: {},
          response: response,
          message: `${getSuccessCode(response.status)} ${response.statusText}`
        };
      } else {
        throw response;
      }
    })
    .catch((err) => {
      const type = err.headers.get("content-type") || "";
      if (type.includes("json")) {
        err.json().then((response: any) => {
          // eslint-disable-next-line no-throw-literal
          throw {
            data: response,
            response: err,
            message: `${getErrorCode(err.status)} ${err.statusText}`
          };
        });
      } else {
        // eslint-disable-next-line no-throw-literal
        throw {
          data: null,
          response: err,
          message: `${getErrorCode(err.status)} ${err.statusText}`
        };
      }
    });
}

/**
 * A fetch library
 */
export class HHLfetch {
  _baseUrl = "";
  _token = "";
  /**
   * @param {string} baseUrl - the baseUrl
   */
  constructor(baseUrl = "") {
    this._baseUrl = baseUrl;
    this._token = "";
  }

  /**
   * Set the base url
   * @type {string}
   */
  set baseUrl(value) {
    this._baseUrl = value;
  }
  get baseUrl() {
    return this._baseUrl;
  }

  /**
   * Set the token
   * @type {string}
   */
  set token(value) {
    this._token = value;
  }
  get token() {
    return this._token;
  }

  /**
   * Decode the token
   * @return {object} The decoded token
   */
  parseToken() {
    const base64Url = this._token.split(".")[1] || this._token;
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  /**
   * call a HTTP API with get
   * @param {string}  url - the api path.
   * @param {object}  params - Paremeters.
   * @return {Promise} This is the result
   */
  get(url: string, param?: any) {
    return getReq(this._baseUrl, url, "get", param);
  }

  /**
   * call a HTTP API with get and inclute token
   * @param {string}  url - the api path.
   * @param {object}  params - Paremeters.
   * @return {Promise} This is the result
   */
  get_withToken(url:string, param?:any) {
    return getReq(this.baseUrl, url, "get", param, null, this._token);
  }

  /**
   * call a HTTP API with post
   * @param {string}  url - the api path.
   * @param {object}  data - the data object to send.
   * @return {Promise} This is the result
   */
  post(url: string, data: any) {
    return getReq(this.baseUrl, url, "post", {}, data);
  }

  /**
   * call a HTTP API with post and inclute token
   * @param {string}  url - the api path.
   * @param {object}  data - the data object to send.
   * @return {Promise} This is the result
   */
  post_withToken(url: string, data: any) {
    return getReq(this.baseUrl, url, "post", {}, data, this._token);
  }

  /**
   * call a HTTP API with delete
   * @param {string}  url - the api path.
   * @param {object}  params - Paremeters.
   * @return {Promise} This is the result
   */
  delete(url: string, param: any) {
    return getReq(this.baseUrl, url, "delete", param);
  }

  /**
   * call a HTTP API with delete
   * @param {string}  url - the api path.
   * @param {object}  params - Paremeters.
   * @return {Promise} This is the result
   */
  delete_withToken(url: string, param: any) {
    return getReq(this.baseUrl, url, "delete", param, null, this._token);
  }
}

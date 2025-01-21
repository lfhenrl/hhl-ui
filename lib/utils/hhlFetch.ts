function queryStringify(params: any) {
  if (!params) {
    return;
  }
  return Object.entries(params).reduce((acc, entry, index) => {
    const [param, value] = entry;
    const encoded =
      index === 0
        ? `${param}=${encodeURIComponent(value as string)}`
        : `&${param}=${encodeURIComponent(value as string)}`;
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

const codeList: any = {
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
  503: "The server is currently unavailable.",
  777: "Unknown Error please see console.log",
};

function getSuccessCode(code: number) {
  return codeList[code] || "Unknown Success";
}

function getErrorCode(code: number) {
  return codeList[code] || "Unknown failure";
}

async function getReq(
  baseUrl: string,
  url: string,
  method: string,
  params?: any,
  body?: any,
  token?: string,
  credentials?: boolean,
  timeout?: number
) {
  const controller = new AbortController();
  const id = setTimeout(() => isTimeout(), timeout);
  const uri = createURL(url, params, baseUrl);
  let timeoutError = false;
  const opt: any = {};
  if (credentials) {
    opt.credentials = "include";
  }

  opt.method = method;
  opt.headers = new Headers({
    "Content-Type": "application/json",
  });
  if (token) {
    opt.headers.append("Authorization", "Bearer " + token);
  }
  if (body) {
    opt.body = JSON.stringify(body);
  }

  function isTimeout() {
    timeoutError = true;
    clearTimeout(id);
    controller.abort();
  }
  return await fetch(uri, { ...opt, signal: controller.signal })
    .then((response) => {
      const type = response.headers.get("content-type") || "";
      clearTimeout(id);
      if (response.ok && type.includes("json")) {
        return response.json().then((json) => {
          return {
            data: json,
            ok: true,
            statusCode: response.status,
            message: `${getSuccessCode(response.status)}`,
          };
        });
      } else if (response.ok && response.status < 300) {
        return {
          data: null,
          ok: true,
          statusCode: response.status,
          message: `${getSuccessCode(response.status)}`,
        };
      } else if (type.includes("json")) {
        return response.json().then((json: any) => {
          let info = "Unknown";
          if (json.detail) info = json.detail;
          return {
            data: null,
            ok: false,
            statusCode: response.status,
            message: `${getErrorCode(response.status)} ${info}`,
          };
        });
      } else if (type.includes("text")) {
        return response.text().then((txt: any) => {
          return {
            data: null,
            ok: false,
            statusCode: response.status,
            message: `${getErrorCode(response.status)} ${txt}`,
          };
        });
      } else {
        return {
          data: null,
          ok: false,
          statusCode: 500,
          message: `${getErrorCode(response.status)}`,
        };
      }
    })
    .catch(() => {
      if (timeoutError) {
        return {
          data: null,
          ok: false,
          statusCode: 503,
          message: getErrorCode(503),
        };
      } else {
        return {
          data: null,
          ok: false,
          statusCode: 777,
          message: getErrorCode(777),
        };
      }
    });
}

/**
 * A fetch library
 */
export class hhlFetch {
  _errorHandler: any = null;
  _baseUrl = "";
  _token = "";
  _credentials = false;
  TimeOut = 20000;
  /**
   * @param {string} baseUrl - the baseUrl
   */
  constructor(baseUrl = "") {
    this._baseUrl = baseUrl;
    this._token = "";
  }

  /**
   * Set the ErrorHandler
   * @type {function}
   */
  errorHandler(value: any) {
    this._errorHandler = value;
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
   * Set the token
   * @type {boolean}
   */
  set credentials(value) {
    this._credentials = value;
  }
  get credentials() {
    return this._credentials;
  }

  _reportError(data: any) {
    if (this._errorHandler) this._errorHandler(data);
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
  async get(url: string, param?: any) {
    const d = await getReq(this._baseUrl, url, "get", param, null, this._token, this._credentials, this.TimeOut);
    if (d.ok === false) this._reportError(d);
    return d;
  }

  /**
   * call a HTTP API with post
   * @param {string}  url - the api path.
   * @param {object}  data - the data object to send.
   * @return {Promise} This is the result
   */
  async post(url: string, data: any) {
    const d = await getReq(this.baseUrl, url, "post", {}, data, this._token, this._credentials, this.TimeOut);
    if (d.ok === false) this._reportError(d);
    return d;
  }

  /**
   * call a HTTP API with put
   * @param {string}  url - the api path.
   * @param {object}  data - the data object to send.
   * @return {Promise} This is the result
   */
  async put(url: string, data: any) {
    const d = await getReq(this.baseUrl, url, "put", {}, data, this._token, this._credentials, this.TimeOut);
    if (d.ok === false) this._reportError(d);
    return d;
  }

  /**
   * call a HTTP API with delete
   * @param {string}  url - the api path.
   * @param {object}  params - Paremeters.
   * @return {Promise} This is the result
   */
  async delete(url: string, param: any) {
    const d = await getReq(this.baseUrl, url, "delete", param, null, this._token, this._credentials, this.TimeOut);
    if (d.ok === false) this._reportError(d);
    return d;
  }
}

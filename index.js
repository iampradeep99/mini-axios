const http = require('http');
const https = require('https');
const { URL } = require('url');

function request(method, url, options = {}) {
  const parsedUrl = new URL(url);
  const lib = parsedUrl.protocol === 'https:' ? https : http;

  const headers = options.headers || {};
  const data = options.data ? JSON.stringify(options.data) : null;

  return new Promise((resolve, reject) => {
    const req = lib.request({
      method,
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data ? Buffer.byteLength(data) : 0,
        ...headers
      },
    }, (res) => {
      let body = '';

      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: parsed,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: body,
          });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const miniAxios = {
  get: (url, options) => request('GET', url, options),
  post: (url, options) => request('POST', url, options),
  put: (url, options) => request('PUT', url, options),
  delete: (url, options) => request('DELETE', url, options),
};

module.exports = miniAxios;

const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandle = require('./htmlHandler');
const jsonHandle = require('./jsonHandler');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// list of all handled URLs by method
const urlStruct = {
  POST: {
    '/updateOut': jsonHandle.updateGame,
  },
  GET: {
    '/': htmlHandle.getIndex,
    '/getTick': jsonHandle.getTick,
    '/getWinner': jsonHandle.getWin,
    '/init': jsonHandle.playerInit,
    '/style.css': htmlHandle.getCSS,
    notFound: jsonHandle.notFound,
  },
  HEAD: {
    notFound: jsonHandle.notFoundMeta,
  },
};

// get the url
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  // if the method isnt handled
  if (!urlStruct[request.method]) {
    urlStruct.HEAD.notFound(request, response);
  }
  // if the url and method are handled
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

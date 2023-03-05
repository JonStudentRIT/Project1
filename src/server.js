const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');
const jsonHandler = require('./jsonHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// list of all handled URLs by method
const urlStruct = {
    POST: {
      '/updateOut': jsonHandler.updateGame,
    },
    GET: {
      '/': htmlHandler.getIndex,
      '/getTick' : jsonHandler.getTick,
      '/getWinner' : jsonHandler.getWin,
      '/init' : jsonHandler.playerInit,
      '/style.css': htmlHandler.getCSS,
      notFound: jsonHandler.notFound,
    },
    HEAD: {
      notFound: jsonHandler.notFoundMeta,
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
  if(urlStruct[request.method][parsedUrl.pathname])
  {
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
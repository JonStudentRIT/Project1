const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlHandler.js');
const jsonHandler = require('./jsonHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    POST: {
      '/updateOut': jsonHandler.updateTick,
    },
    GET: {
      '/': htmlHandler.getIndex,
      '/getTick' : jsonHandler.getTick,
      '/init' : jsonHandler.playerInit,
      '/style.css': htmlHandler.getCSS,
    },
    HEAD: {},
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if(urlStruct[request.method][parsedUrl.pathname])
  {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  }
};

http.createServer(onRequest).listen(port);
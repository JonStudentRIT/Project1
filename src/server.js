const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlHandler.js');
const jsonHandler = require('./jsonHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//polling 
//https://www.geeksforgeeks.org/what-is-long-polling-and-short-polling/
//https://javascript.info/long-polling
const urlStruct = {
    POST: {},
    GET: {
      '/': htmlHandler.getIndex,
      '/style.css': htmlHandler.getCSS,
    },
    HEAD: {},
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  console.log(parsedUrl);
  htmlHandler.getIndex(request, response);
};

http.createServer(onRequest).listen(port);
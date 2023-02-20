const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../index.html`);
const css = fs.readFileSync(`${__dirname}/../style.css`);

// general html response function
const wrightResponse = (response, fileType, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(fileType);
  response.end();
};

// get the home page
const getIndex = (request, response) => {
  wrightResponse(response, index, 'text/html');
};

// get the css
const getCSS = (request, response) => {
  wrightResponse(response, css, 'text/css');
};

module.exports = {
  getIndex,
  getCSS,
};

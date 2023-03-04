const query = require('querystring');

let tick = 'Not Ticked';

const respondJSON = (request, response, status, object) => {
    const headers = { 'Content-Type': 'application/json' };
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    const headers = { 'Content-Type': 'application/json' };
    response.writeHead(status, headers);
    response.end();
  };

const getTick = (request, response) => {
        const responseJSON = { message: tick };
        return respondJSON(request, response, 200, responseJSON);
};

const updateTick = (request, response) => {
    let body = [];

    request.on('data', (chunk) => {
    body.push(chunk);
    });

    request.on('end', () => {
        console.log(tick);
        const bodyString = Buffer.concat(body).toString();
        body = query.parse(bodyString);
        tick = body;
        console.log(tick);
        const responseJSON = { message: tick };
        return respondJSON(request, response, 201, responseJSON);
    });
};

module.exports = {
    getTick,
    updateTick,
};
  

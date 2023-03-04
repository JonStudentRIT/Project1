// requiered
// 200 ok
// 201 created
// 204 no content (normally head)
// 400 bad request
// 404 not found
// 500 unknown server error (optinal)

// get head and post are requiered
// one get must support query perameters
// post must update data in the api

// git lint heroku and circleCI as usual
// any borrowed code must be documented and other usual requierments for basically all code assignemnts.


const { request } = require('http');
const query = require('querystring');

let player1 = { index : 1, active : true, selected : false };
let player2 = { index : 2, active : false, selected : false };

let gameBoard = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0';

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

// the client is assigned a role in the game
const playerInit = (request, response) => {
    let responseJSON = {message: ' '};
    if(player1.selected === false)
    {
        responseJSON.message = '1';
        player1.selected = true;
        return respondJSON(request, response, 201, responseJSON);
    }
    else if (player2.selected === false)
    {
        responseJSON.message = '2';
        player2.selected = true;
        return respondJSON(request, response, 201, responseJSON);
    }
    else
    {
        responseJSON.message = '3';
        return respondJSON(request, response, 201, responseJSON);
    }
}

const getTick = (request, response) => {
        const responseJSON = {player: player1.active, board: gameBoard};
        return respondJSON(request, response, 200, responseJSON);
};

const updateTick = (request, response) => {
    let body = [];

    request.on('data', (chunk) => {
    body.push(chunk);
    });

    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        body = query.parse(bodyString);

        if(body.id === '1')
        {
            if(player1.active)
            {
                player1.active = false;
                player2.active = true;
            }
        }
        if(body.id === '2')
        {
            if(player2.active)
            {
                player1.active = true;
                player2.active = false;
            }
        }
        gameBoard = body.board;
        const responseJSON = { message: 'Posted' };
        return respondJSON(request, response, 201, responseJSON);
    });
};

module.exports = {
    getTick,
    updateTick,
    playerInit,
};
  

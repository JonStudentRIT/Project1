const { request } = require('http');
const query = require('querystring');

// the two players
let player1 = { index : 1, active : true, selected : false };
let player2 = { index : 2, active : false, selected : false };

// the gameBoard being sent through the clients and the server
let gameBoard = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0';

// general json response get function
const respondJSON = (request, response, status, object) => {
    const headers = { 'Content-Type': 'application/json' };
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

// general json response head function
const respondJSONMeta = (request, response, status) => {
    const headers = { 'Content-Type': 'application/json' };
    response.writeHead(status, headers);
    response.end();
  };

// the client is assigned a role in the game
const playerInit = (request, response) => {
    let responseJSON = {message: ' '};
    // player one is set
    if(player1.selected === false)
    {
        responseJSON.message = '1';
        player1.selected = true;
        return respondJSON(request, response, 201, responseJSON);
    }
    // player two is set
    else if (player2.selected === false)
    {
        responseJSON.message = '2';
        player2.selected = true;
        return respondJSON(request, response, 201, responseJSON);
    }
    // all additional people are spectators 
    else
    {
        responseJSON.message = '3';
        return respondJSON(request, response, 201, responseJSON);
    }
}

// get the board status and the current players turn
const getTick = (request, response) => {
    const responseJSON = {player: player1.active, board: gameBoard};
    return respondJSON(request, response, 200, responseJSON);
};

// look to see if the player under "player=#" has won
const getWin = (request, response, params) => {
    let responseJSON = {};
    if(params.player)
    {
        // is the player a player
        if(params.player == '1' || params.player == '2')
        {
            let didThisPLayerWin = searchWinCondition(params.player);
            responseJSON = {winner: didThisPLayerWin};
            return respondJSON(request, response, 200, responseJSON);
        }
        // or a spectator
        responseJSON.message = 'The player Identity in this case is a spectator not a player',
        responseJSON.id = 'notAPlayer'
        return respondJSON(request, response, 400, responseJSON);
    }
    responseJSON.message = 'The player parameter is missing',
    responseJSON.id = 'missingPlayer'
    return respondJSON(request, response, 400, responseJSON);
};

const updateGame = (request, response) => {
    let body = [];

    request.on('data', (chunk) => {
    body.push(chunk);
    });

    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        body = query.parse(bodyString);

        // is the players move not permitted
        if(body.valid === 'false')
        {
            return respondJSONMeta(request, response, 204);
        }

        // if it is permitted then who is the player moving
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
        // update the board
        gameBoard = body.board;
        const responseJSON = { message: gameBoard };
        return respondJSON(request, response, 201, responseJSON);
    });
};

// did the player reach a win condition
const searchWinCondition = (player) => {
    let board = [];
    board = gameBoard.split(',');
    let win = false;
    // horizontal
    if (board[12] == player && board[13] == player && board[14] == player && board[15] == player) {
        win = true;
      }
      if (board[8] == player && board[9] == player && board[10] == player && board[11] == player) {
        win = true;
      }
      if (board[4] == player && board[5] == player && board[6] == player && board[7] == player) {
        win = true;
      }
      if (board[0] == player && board[1] == player && board[2] == player && board[3] == player) {
        win = true;
      }
      // vertical
      if (board[15] == player && board[11] == player && board[7] == player && board[3] == player) {
        win = true;
      }
      if (board[14] == player && board[10] == player && board[6] == player && board[2] == player) {
        win = true;
      }
      if (board[13] == player && board[9] == player && board[5] == player && board[1] == player) {
        win = true;
      }
      if (board[12] == player && board[8] == player && board[4] == player && board[0] == player) {
        win = true;
      }
      // left Cross
      if (board[12] == player && board[9] == player && board[6] == player && board[3] == player) {
        win = true;
      }
      // right cross
      if (board[15] == player && board[10] == player && board[5] == player && board[0] == player) {
        win = true;
      }
      return win;
};

// was the page not found
const notFound = (request, response) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
    respondJSON(request, response, 404, responseJSON);
  };

const notFoundMeta = (request, response) => {
    respondJSONMeta(request, response, 404);
  };

module.exports = {
    getTick,
    updateGame,
    playerInit,
    getWin,
    notFound,
    notFoundMeta,
};
  

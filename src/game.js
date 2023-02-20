// basic game logic
// later idea is if there will be more than 2 player the board will have to be bigger
// but you can also have it as though if a player leaves their pieces diapear and rearrange the board

// empty - 0
// P1 - 1
// p2 - 2
// might add more players for above and beyond
const board = [];
const boardSize = 15;
for (let i = 0; i < boardSize; i++) {
  board[i] = 0;
}
// game logi
const players = [];
for (let i = 0; i < players.length; i++) {
  // 0000 0-3   0001  0001  1000
  // 0000 4-7   0001  0010  0100
  // 0000 8-11  0001  0100  0010
  // 1111 12-15 0001  1000  0001

  // horizontal
  if (board[12] == players[i] && board[13] == players[i] && board[14] == players[i] && board[15] == players[i]) {
    players[i];// win define later
  }
  if (board[8] == players[i] && board[9] == players[i] && board[10] == players[i] && board[11] == players[i]) {
    players[i];// win define later
  }
  if (board[4] == players[i] && board[5] == players[i] && board[6] == players[i] && board[7] == players[i]) {
    players[i];// win define later
  }
  if (board[0] == players[i] && board[1] == players[i] && board[2] == players[i] && board[3] == players[i]) {
    players[i];// win define later
  }
  // vertical
  if (board[15] == players[i] && board[11] == players[i] && board[7] == players[i] && board[3] == players[i]) {
    players[i];// win define later
  }
  if (board[14] == players[i] && board[10] == players[i] && board[6] == players[i] && board[2] == players[i]) {
    players[i];// win define later
  }
  if (board[13] == players[i] && board[9] == players[i] && board[5] == players[i] && board[1] == players[i]) {
    players[i];// win define later
  }
  if (board[12] == players[i] && board[8] == players[i] && board[4] == players[i] && board[0] == players[i]) {
    players[i];// win define later
  }
  // left Cross
  if (board[12] == players[i] && board[9] == players[i] && board[6] == players[i] && board[3] == players[i]) {
    players[i];// win define later
  }
  // right cross
  if (board[15] == players[i] && board[10] == players[i] && board[5] == players[i] && board[0] == players[i]) {
    players[i];// win define later
  }
}

const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    //Screen.addCommand('t', 'test command (remove)', TTT.testCommand);
    //Screen.render();

    Screen.addCommand(
      "up",
      "moves cursor up",
      this.cursor.up.bind(this.cursor)
    );
    Screen.addCommand(
      "down",
      "moves cursor down",
      this.cursor.down.bind(this.cursor)
    );
    Screen.addCommand(
      "left",
      "moves cursor left",
      this.cursor.left.bind(this.cursor)
    );
    Screen.addCommand(
      "right",
      "moves cursor right",
      this.cursor.right.bind(this.cursor)
    );
    
    Screen.addCommand("o", "adds O to the board", TTT.move.bind(this, "O"));
    Screen.addCommand("x", "adds X to the board", TTT.move.bind(this, "X"));
    
    Screen.render();
  }

  static move(symbol) {
    this.grid[this.cursor.row][this.cursor.col] = symbol;
    Screen.setGrid(this.cursor.row, this.cursor.col, symbol);
    let isWinner = TTT.checkWin(this.grid);
    if (isWinner) {
      TTT.endGame(isWinner);
    }
  }


  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    if (TTT.isEmpty(grid)) {
      return false;
    }

    let isRowWin = TTT.rowWin(grid);
    if (isRowWin) {
      return isRowWin;
    }

    let isColWin = TTT.colWin(grid);
    if (isColWin) {
      return isColWin;
    }

    let isDiagWin = TTT.diagWin(grid);
    if (isDiagWin) {
      return isDiagWin;
    }

    if (TTT.isFilled(grid)) {
      return "T";
    }

    if (TTT.anyEmpty(grid)) {
      return false;
    }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

  static diagWin(grid) {
    const leftDiag = TTT.getLeftDiag(grid);
    const rightDiag = TTT.getRightDiag(grid);

    if (leftDiag.every((el) => el === leftDiag[0] && el !== " ")) {
      return leftDiag[0];
    } else if (rightDiag.every((el) => el === rightDiag[0] && el !== " ")) {
      return rightDiag[0];
    } else {
      return false;
    }
  }

  static getLeftDiag(grid) {
    let diag = [];
    for (let row = 0; row < grid.length; row++) {
      let col = row;
      diag.push(grid[row][col]);
    }
    return diag;
  }

  static getRightDiag(grid) {
    let diag = [];
    for (let row = 0; row < grid.length; row++) {
      let col = grid.length - 1 - row;
      diag.push(grid[row][col]);
    }
    return diag;
  }

  static colWin(grid) {
    for (let col = 0; col < grid.length; col++) {
      let allInCol = TTT.arrEqual(TTT.getCol(grid, col));
      if (allInCol) {
        return allInCol;
      }
    }
    return false;
  }

  static rowWin(grid) {
    for (let row = 0; row < grid.length; row++) {
      let allInRow = TTT.arrEqual(grid[row]);
      if (allInRow) {
        return allInRow;
      }
    }
    return false;
  }

  static getCol(grid, n) {
    let col = [];
    for (let row = 0; row < grid.length; row++) {
      col.push(grid[row][n]);
    }
    return col;
  }

  static arrEqual(arr) {
    if (arr.every((el) => el === arr[0] && el !== " ")) {
      return arr[0];
    } else {
      return false;
    }
  }

  static isEmpty(grid) {
    let empty = true;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        empty = empty && grid[row][col] === " ";
      }
    }
    return empty;
  }

  static isFilled(grid) {
    let filled = true;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        filled = filled && grid[row][col] != " ";
      }
    }
    return filled;
  }

  static anyEmpty(grid) {
    let any = false;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        any = any || grid[row][col] === " ";
      }
    }
    return any;
  }
  
}

module.exports = TTT;

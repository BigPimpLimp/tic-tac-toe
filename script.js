function createPlayer (name) {
   name;
   let record = 0;
   const getRecord = () => record;
   const giveWin = () => record++;
   const giveLoss = () => record--;
   let char;

   return {name, getRecord, giveWin, giveLoss, char};
}

function gameBoard () {
   const board = [
         [0, 1, 2],
         [0, 1, 2],
         [0, 1, 2]
      ];

      const getBoard = () => board;

      const printBoard = () => {
         console.log(board);
      };

   return {board, getBoard, printBoard};
};

function displayController () {

  

   const createBoard = () => {
      const gridContainer = document.getElementById('grid-container');
      const rows = 3;
      const columns = 3;

      for (i = 0; i < rows; i++) {
         for (j = 0; j < columns; j++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridContainer.appendChild(gridCell);
         }
      }
   }
   createBoard();

   const getSquare = () => {
      console.log(getActivePlayer().char);
      document.addEventListener('click', (e) => {
         const target = e.target.closest('.grid-cell')
         if (target) {
            target.innerHTML = getActivePlayer().char;
         }
      })
   }

   return {getSquare, createBoard};
};

(function gameController () {

   const placer = displayController();

   const inputPlayer = () => {
      const playerOne = createPlayer(prompt('Who is player 1?'));
      playerOne.char = 'x';
      console.log(playerOne.name);
      const playerTwo = createPlayer(prompt('Who is player 2?'));
      playerTwo.char = 'o';
      const players = [
         playerOne,
         playerTwo
      ];
      document.addEventListener('DOMContentLoaded', function() {
         document.getElementById('player-one').innerHTML = playerOne.name;
         document.getElementById('player-two').innerHTML = playerTwo.name;
      });
      return {players};
   }
   const { players } = inputPlayer();
   
   const game = gameBoard();
    
   let activePlayer = players[0];

   const switchTurn = () => {
      activePlayer = activePlayer === 
      players[0] ? players[1] : players[0];
   };

   const getActivePlayer = () => activePlayer;

   const printTurn = () => {
      alert(`${getActivePlayer().name}'s turn`);
   };

   const printWinner = () => {
      alert(`${getActivePlayer().name} wins!!!`);
   };

   const printRecord = () => {
      alert(`${getActivePlayer().name} has ${getActivePlayer().getRecord()} win(s)!`)
   }


   const winChecker = (arr) => {
      const threeX = (value) => value === 'x';
      const threeO = (value) => value === 'o';
      let boardFull = 0;

      for (x = 0; x < arr.length; x++) {
         for (j = 0; j < arr[x].length; j++) {
            if (arr[0].every(threeX) || arr[0].every(threeO)) {
               printWinner();
               getActivePlayer().giveWin();
               printRecord();
            };
            if (arr[1].every(threeX) || arr[1].every(threeO)) {
               printWinner();
               getActivePlayer().giveWin();
               printRecord();
            };
            if (arr[2].every(threeX) || arr[2].every(threeO)) {
               printWinner();
               getActivePlayer().giveWin();
               printRecord();
            };
            if (arr[0][0] === 'x' && arr[1][0] === 'x' && arr[2][0] === 'x' ||
                arr[0][0] === 'o' && arr[1][0] === 'o' && arr[2][0] === 'o')  {
               printWinner();
               getActivePlayer().giveWin();
               printRecord();
            };
            if (arr[0][1] === 'x' && arr[1][1] === 'x' && arr[2][1] === 'x' ||
                arr[0][1] === 'o' && arr[1][1] === 'o' && arr[2][1] === 'o')  {
               printWinner();
               getActivePlayer().giveWin();
               printRecord();
            };
            if (arr[0][2] === 'x' && arr[1][2] === 'x' && arr[2][2] === 'x' ||
                arr[0][2] === 'o' && arr[1][2] === 'o' && arr[2][2] === 'o')  {
               printWinner();
               getActivePlayer().giveWin();
               printRecord();
            };
            if (arr[0][0] === 'x' && arr[1][1] === 'x' && arr[2][2] === 'x' ||
                arr[0][0] === 'o' && arr[1][1] === 'o' && arr[1][1] === 'o')  {
               printWinner();
               getActivePlayer().giveWin();
               printRecord();
            };
            if (arr[0][2] === 'x' && arr[1][1] === 'x' && arr[2][0] === 'x' ||
                arr[0][2] === 'o' && arr[1][1] === 'o' && arr[2][0] === 'o')  {
               printWinner();
               getActivePlayer().giveWin();
               printRecord();
            };
            if (arr[x][j] === 'x' || arr[x][j] === 'o') {
               boardFull++;
               console.log(boardFull);
            };
            if (boardFull === 8) {
               console.log('It\'s a tie!');
            };
           
         };
      };
   };

   const playRound = () => {
   let i = 0
   while (i < 9) {
      // printTurn();

      // game.board[row][column] = getActivePlayer().char;
      placer.getSquare();
      game.printBoard();
      winChecker(game.board);
      switchTurn();
      i++;
   };


   };

   playRound();

   return {switchTurn, getActivePlayer, printTurn, playRound, players};
})();

const testing = gameController();
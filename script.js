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

(function displayController () {

   const createBoard = () => {
      const gridContainer = document.getElementById('grid-container');
      const rows = 3;
      const columns = 3;
      let rowIndex = 0;
      let columnIndex = 0;

      for (i = 0; i < rows; i++) {
         for (j = 0; j < columns; j++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.dataset.indexRow = rowIndex;
            gridCell.dataset.indexColumn = columnIndex;
            gridContainer.appendChild(gridCell);
            columnIndex++;
            if (columnIndex === 3) {
               columnIndex = 0;
            };
         }
         rowIndex++;
      }  
   }

   createBoard();

})();

(function gameController () {

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

   const alertTurn = () => {
      alert(`${getActivePlayer().name}'s turn`);
   };

   const alertWinner = () => {
      alert(`${getActivePlayer().name} wins!!!`);
   };

   const alertRecord = () => {
      alert(`${getActivePlayer().name} has ${getActivePlayer().getRecord()} win(s)!`)
   }

   const playRound = () => {
      document.addEventListener('click', (e) => {
         const target = e.target.closest('.grid-cell')
         if (target) {
            target.innerHTML = getActivePlayer().char;   
            let columnIndex = target.getAttribute('data-index-column');
            let rowIndex = target.getAttribute('data-index-row');
            game.board[rowIndex][columnIndex] = getActivePlayer().char;
            setTimeout(function() {
               winChecker(game.board);
               switchTurn();
            }, 10);
         }
         
      })
   }

   const winChecker = (arr) => {
      const checkWinner = (char) => {
         for (let i = 0; i < 3; i++) {
            if (arr[i].every(cell => cell === char)) return true;
            if (arr.every(row => row[i] === char)) return true;
         }

         if ((arr[0][2] === 'x' && arr[1][1] === 'x' && arr[2][0] === 'x') ||
             (arr[0][2] === 'o' && arr[1][1] === 'o' && arr[2][0] === 'o'))  {
             return true;
         }

         return false;
      } 

      if (checkWinner('x')) {
         alertWinner();
         getActivePlayer().giveWin();
         alertRecord();
         clearBoard(game.board);
         return;
      }

      if (checkWinner('o')) {
         alertWinner();
         getActivePlayer().giveWin();
         alertRecord();
         clearBoard(game.board);
         return;
      }

      const boardFull = arr.flat().filter(cell => cell === 'x' || cell === 'o').length === 9;
      if (boardFull) {
        alert('It\'s a tie!');
      } 
   };

   const clearBoard = (arr) => {
         document.querySelectorAll('.grid-cell').innerHTML = '';
         for (let i = 0; i < 3; i++) {
            arr[i].every(cell => cell = '');
         };
      };

   const btn = document.getElementById('clear-board');
   btn.addEventListener('click', () => {
      const board = document.querySelectorAll('.grid-cell');
      board.innerHTML = '';
      for (let i = 0; i < 3; i++) {
         console.log('fuck me');
         game.board[i].every(cell => cell = '');
      };
   });
      

   
   playRound();

})();


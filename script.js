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
      const playerOne = createPlayer(prompt('Who is x?'));
      playerOne.char = 'x';
      console.log(playerOne.name);
      const playerTwo = createPlayer(prompt('Who is o?'));
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
   };
   
   const { players } = inputPlayer();
   
   const game = gameBoard();
    
   let activePlayer = players[0];

   const getActivePlayer = () => activePlayer;

   const switchTurn = () => {
      activePlayer = activePlayer === 
      players[0] ? players[1] : players[0];
   };

   const displayTurn = () => {
      const player1 = document.getElementById('player-one-turn');
      const player2 = document.getElementById('player-two-turn');
      if (getActivePlayer() === players[0]) {
         player1.innerHTML = 'Your turn!';
         player2.innerHTML = '';
      }
      if (getActivePlayer() === players[1]) {
         player2.innerHTML = 'Your turn!';
         player1.innerHTML = '';
      } 

   }

   const alertWinner = () => {
      alert(`${getActivePlayer().name} wins!!!`);
   };

   const alertRecord = () => {
      alert(`${getActivePlayer().name} has ${getActivePlayer().getRecord()} win(s)!`)
   }

   displayTurn();
   
   const playRound = () => {
      document.addEventListener('click', (e) => {
         const target = e.target.closest('.grid-cell')
         if (target) {
            if (target.innerHTML === 'x' || target.innerHTML === 'o') {
               alert('Can\'t do that bro!');
               return;
            }
            target.innerHTML = getActivePlayer().char;   
            let columnIndex = target.getAttribute('data-index-column');
            let rowIndex = target.getAttribute('data-index-row');
            game.board[rowIndex][columnIndex] = getActivePlayer().char;
            setTimeout(function() {
               winChecker(game.board);
               switchTurn();
               displayTurn();
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

         if (arr[0][0] === char && arr[1][1] === char && arr[2][2] === char) return true;
         if (arr[0][2] === char && arr[1][1] === char && arr[2][0] === char) return true;

      } 

      if (checkWinner('x')) {
         alertWinner();
         getActivePlayer().giveWin();
         alertRecord();
         clearBoard();
         return;
      }

      if (checkWinner('o')) {
         alertWinner();
         getActivePlayer().giveWin();
         alertRecord();
         clearBoard();
         return;
      }

      const boardFull = arr.flat().filter(cell => cell === 'x' || cell === 'o').length === 9;
      if (boardFull) {
        alert('It\'s a tie!');
        clearBoard();
      } 
   };

   const clearBoard = () => {
      game.board = game.board.map(row => row.map(cell => ''));
      const tiles = document.querySelectorAll('.grid-cell');
         tiles.forEach(tile => {
            tile.innerHTML = '';
         });            
      };

   const btn = document.getElementById('clear-board');
   btn.addEventListener('click', () => {
      game.board = game.board.map(row => row.map(cell => ''));
      const tiles = document.querySelectorAll('.grid-cell');
      tiles.forEach(tile => {
         tile.innerHTML = '';
      });
      switchTurn();
      displayTurn();
   });
        
   playRound();

})();

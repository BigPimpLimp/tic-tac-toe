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

(function gameController () {
   const playerOne = createPlayer(prompt('Who is player 1?'));
   playerOne.char = prompt('x or o?');
   console.log(playerOne);

   const playerTwo = createPlayer(prompt('Who is player 2?'));
   playerTwo.char = prompt('x or o?');
   const game = gameBoard();
   const players = [
      playerOne,
      playerTwo
   ];

   let activePlayer = players[0];

   const switchTurn = () => {
      activePlayer = activePlayer === 
      players[0] ? players[1] : players[0];
   };

   const getActivePlayer = () => activePlayer;

   const printTurn = () => {
      console.log(`${getActivePlayer().name}'s turn`);
   };


   const winChecker = (arr) => {
      const threeX = (value) => value === 'x';
      const threeO = (value) => value === 'o';

      for (i = 0; i < arr.length; i++) {
         for (j = 0; j < arr[i].length; j++) {
            if (arr[0].every(threeX) || arr[0].every(threeO)) {
               console.log(`${getActivePlayer().name} wins!!!`);
               getActivePlayer().giveWin();
               console.log(`${getActivePlayer().name} has ${getActivePlayer().getRecord()} win(s)!`)
               i = 10;
            };
            if (arr[1].every(threeX) || arr[1].every(threeO)) {
               console.log(`${getActivePlayer().name} wins!!!`);
            };
            if (arr[2].every(threeX) || arr[2].every(threeO)) {
               console.log(`${getActivePlayer().name} wins!!!`);
            };
            if (arr[0][0] === 'x' && arr[1][0] === 'x' && arr[2][0] === 'x' ||
                arr[0][0] === 'o' && arr[1][0] === 'o' && arr[2][0] === 'o')  {
                console.log(`${getActivePlayer().name} wins!!!`);
            };
            if (arr[0][1] === 'x' && arr[1][1] === 'x' && arr[2][1] === 'x' ||
                arr[0][1] === 'o' && arr[1][1] === 'o' && arr[2][1] === 'o')  {
                console.log(`${getActivePlayer().name} wins!!!`);
            };
            if (arr[0][2] === 'x' && arr[1][2] === 'x' && arr[2][2] === 'x' ||
                arr[0][2] === 'o' && arr[1][2] === 'o' && arr[2][2] === 'o')  {
                console.log(`${getActivePlayer().name} wins!!!`);
            };
            if (arr[0][0] === 'x' && arr[1][1] === 'x' && arr[2][2] === 'x' ||
                arr[0][0] === 'o' && arr[1][1] === 'o' && arr[1][1] === 'o')  {
                console.log(`${getActivePlayer().name} wins!!!`);
            };
            if (arr[0][2] === 'x' && arr[1][1] === 'x' && arr[2][0] === 'x' ||
                arr[0][2] === 'o' && arr[1][1] === 'o' && arr[2][0] === 'o')  {
                console.log(`${getActivePlayer().name} wins!!!`);
            };
         }
      }
   };

   const playRound = () => {
   let i = 0
   while (i < 9) {
      printTurn();
      let row = prompt('Enter row position');
      let column = prompt('Enter column position');
      game.board[row][column] = getActivePlayer().char;
      game.printBoard();
      winChecker(game.board);
      switchTurn();
      i++;
   }
   };

   playRound();

   return {switchTurn, getActivePlayer, printRound, playRound};
})();

const test = gameController();
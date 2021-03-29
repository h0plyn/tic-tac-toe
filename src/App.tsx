import { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array<String>(9).fill(''));
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinnter] = useState<String | null>(null);

  const handleClick = (idx: number) => {
    let boardCopy = [...board];
    boardCopy[idx] = isNext ? 'X' : 'O';
    setBoard(boardCopy);
    isWinner(boardCopy);
    setIsNext(!isNext);
  };

  const isWinner = (board: Array<String>) => {
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      let [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinnter(board[a]);
        return board[a];
      }
    }
    return null;
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {winner && <h1 className="winner">{winner} Wins!</h1>}
      {!winner && <h1>{isNext ? 'X' : 'O'} is up.</h1>}
      <div id="board">
        {board.map((square, idx) => {
          return (
            <div className="square" key={idx} onClick={() => handleClick(idx)}>
              <div className="mark-container">{board[idx]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

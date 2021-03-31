import { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array<String>(9).fill(''));
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState<String | null>(null);

  const isWinner = (activeBoard: Array<String>) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i += 1) {
      const [a, b, c] = winningCombos[i];
      if (
        activeBoard[a] &&
        activeBoard[a] === activeBoard[b] &&
        activeBoard[b] === activeBoard[c]
      ) {
        setWinner(activeBoard[a]);
        return activeBoard[a];
      }
    }
    return null;
  };

  const handleClick = (idx: number) => {
    const boardCopy = [...board];
    if (!boardCopy[idx]) {
      boardCopy[idx] = isNext ? 'X' : 'O';
      setBoard(boardCopy);
      isWinner(boardCopy);
      setIsNext(!isNext);
    }
  };

  const playAgain = () => {
    setBoard(Array<String>(9).fill(''));
    setWinner(null);
  };

  return (
    <div className="App">
      <h1 className="title">Tic Tac Toe</h1>
      {winner && <h1 className="winner">{winner} Wins!</h1>}
      {!winner && (
        <h1 className="sub-head">
          <span className="player">{isNext ? 'X' : 'O'}</span> is up
        </h1>
      )}
      <div id="board">
        {board.map((square, idx) => (
          <div
            className="square"
            key={Math.random()}
            onClick={() => handleClick(idx)}
          >
            <div className="mark-container">{board[idx]}</div>
          </div>
        ))}
      </div>
      {winner && (
        <button className="play-again" onClick={() => playAgain()}>
          Play Again
        </button>
      )}
    </div>
  );
}

export default App;

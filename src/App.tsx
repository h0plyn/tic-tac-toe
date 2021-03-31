import { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState<string>('');
  const [tie, setTie] = useState<boolean>(false);

  interface Leaderboard {
    x: number;
    o: number;
  }

  const [leaderboard, setLeaderboard] = useState<Leaderboard>({ x: 0, o: 0 });

  const isWinner = (activeBoard: string[]) => {
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
    if (winner) return;
    const boardCopy = [...board];
    if (!boardCopy[idx]) {
      boardCopy[idx] = isNext ? 'X' : 'O';
      setBoard(boardCopy);
      isWinner(boardCopy);
      setIsNext(!isNext);
    }

    if (!boardCopy.includes('')) setTie(true);
  };

  const playAgain = (winner: string) => {
    if (!tie) {
      const updateLeaderboard = winner === 'X' ? true : false;
      if (updateLeaderboard)
        setLeaderboard({ ...leaderboard, x: leaderboard.x + 1 });
      else setLeaderboard({ ...leaderboard, o: leaderboard.o + 1 });
    } else {
      setTie(false);
    }
    setBoard(Array<string>(9).fill(''));
    setWinner('');
  };

  return (
    <div className="App">
      <h1 className="title">Tic Tac Toe</h1>
      {tie && <h1 className="purple">Tie!</h1>}
      {winner && <h1 className="winner">{winner} Wins!</h1>}
      {winner || tie ? (
        <button className="play-again" onClick={() => playAgain(winner)}>
          Play Again
        </button>
      ) : null}
      {!winner && (
        <h1 className="sub-head">
          Player
          <span className="purple"> {isNext ? 'X' : 'O'}</span> is up
        </h1>
      )}
      <div className="game-area">
        <div className="left-placeholder"></div>
        <div id="board">
          {board.map((_, idx) => (
            <div
              className="square"
              key={Math.random()}
              onClick={() => handleClick(idx)}
            >
              <div className="mark-container">{board[idx]}</div>
            </div>
          ))}
        </div>
        {leaderboard.x || leaderboard.o ? (
          <div className="leaderboard">
            <h2>Leaderboard:</h2>
            <h2 className="leaderboard-player">X: {leaderboard.x}</h2>
            <h2 className="leaderboard-player">O: {leaderboard.o}</h2>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

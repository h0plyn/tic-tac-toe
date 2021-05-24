import { useState } from 'react';
import useGameLogic from './GameLogic';
import './App.css';

function App() {
  const {
    board,
    setBoard,
    isNext,
    setIsNext,
    winner,
    setWinner,
    tie,
    setTie,
    leaderboard,
    setLeaderboard,
    handleClick,
    playAgain,
  } = useGameLogic();

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

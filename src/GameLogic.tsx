import { useState } from 'react';
import { Leaderboard } from './types';

export default function useGameLogic() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isNext, setIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string>('');
  const [tie, setTie] = useState<boolean>(false);
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

  return {
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
  };
}

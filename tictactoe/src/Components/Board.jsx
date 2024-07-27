import React, { useState } from 'react';
import cross from '../assets/cross.png';
import record from '../assets/record.png';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);
  const isDraw = !winner && !squares.includes(null);

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <button
      key={index}
      className="w-16 h-16 border-2 border-gray-700 flex items-center justify-center text-2xl bg-gray-800 hover:bg-gray-700 transition-colors"
      onClick={() => handleClick(index)}
    >
      {squares[index] === 'X' ? <img src={cross} alt="X" className="w-12 h-12" /> : 
       squares[index] === 'O' ? <img src={record} alt="O" className="w-12 h-12" /> : null}
    </button>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-1 mb-4">
        {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
      </div>
      {winner ? (
        <div className="text-xl font-bold mb-4 text-white">{`Winner: ${winner}`}</div>
      ) : isDraw ? (
        <div className="text-xl font-bold mb-4 text-white">It's a draw!</div>
      ) : null}
      {(winner || isDraw) && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

// Helper function to calculate winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;

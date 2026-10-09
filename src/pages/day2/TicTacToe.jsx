import { Link } from "react-router-dom";
import "./TicTacToe.css";
import { useState } from "react";

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button className={isWinning ? 'square winning' : 'square'} onClick={onSquareClick}>
      {value}
    </button>
  );
}
function calculateWinner(squares) {
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
      return {
        winner: squares[a],
        line: [a,b,c]
      }
    }
  }
  return null;
}
function Board({ xIsNext, squares, onPlay }) {
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  function handleClick(i) {
    if (winner || !squares.includes(null)) {
      return;
    }
    if (squares[i]) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line;
  let status;
  if (winner) {
    status = "勝者：" + winner;
  } else if (!squares.includes(null)) {
    status = "引き分け";
  } else {
    status = "次の手番：" + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h1>三目並べ</h1>
      <div className="board">
        <div className="status">{status}</div>
        {rows.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((i) => (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                isWinning={winningLine?.includes(i)}
              />
            ))}
          </div>
        ))}
      </div>
      <p>
        <Link to="/day2">← Day 2 の目次へ戻る</Link>
      </p>
    </>
  );
}

export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    setHistory([...nextHistory, nextSquares]);
    setCurrentMove(nextHistory.length);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    let position;
    if (move > 0) {
      const previousSquares = history[move - 1];
      const currentSquares = history[move];
      let squareIndex;
      for (let i = 0; i < 9; i++) {
        if (previousSquares[i] !== currentSquares[i]) {
          squareIndex = i;
          break;
        }
      }
      const row = Math.floor(squareIndex / 3) + 1;
      const col = (squareIndex % 3) + 1;
      const player = move % 2 === 1 ? 'X' : 'O'

      position = `${row}行${col}列`;
      description = `${move}手目へ戻る（${player} : ${position}）`;
    } else {
      description = `ゲーム開始時へ戻る`;
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <span>
            {move === 0
              ? `現在：ゲーム開始時`
              : `現在：${move}手目(${position})`}
          </span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });
  const sortedMoves = isAscending ? moves : [...moves].reverse();
  return (
    <>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

      <button onClick={() => setIsAscending(!isAscending)}>
        {isAscending ? "降順にする" : "昇順にする"}
      </button>
      <ol>{sortedMoves}</ol>
    </>
  );
}

import { Link } from 'react-router-dom'
import './TicTacToe.css'
import {useState} from 'react'

function Square({value}) {
  function handleClick(i){
    if (value){
      return;
    }
    setValue(xIsNext ? 'X' : 'O');
    setXIsNext(!xIsNext);
  }
  return <button onClick={handleClick}>{value}</button>
}
export default function TicTacToe() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState([null,null,null,null,null,null,null,null,null])
  return (
    <>
      <h1>三目並べ</h1>
      {
       <div> 
       <div>
         <Square
         value={squares[0]}
         />
         <Square
         value={squares[1]}
         />
         <Square
         value={squares[2]}
         />
       </div>
       <div>
         <Square
         value={squares[3]}
         />
         <Square
         value={squares[4]}
         />
         <Square
         value={squares[5]}
         />
       </div>
       <div>
         <Square
         value={squares[6]}
         />
         <Square
         value={squares[7]}
         />
         <Square
         value={squares[8]}
         />
       </div>
       </div>
      }
      <p><Link to="/day2">← Day 2 の目次へ戻る</Link></p>
    </>
  )
}

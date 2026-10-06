import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Day2 from './pages/Day2.jsx'
import Quickstart from './pages/day2/Quickstart.jsx'
import TicTacToe from './pages/day2/TicTacToe.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day2" element={<Day2 />} />
      <Route path="/day2/quickstart" element={<Quickstart />} />
      <Route path="/day2/tic-tac-toe" element={<TicTacToe />} />
    </Routes>
  )
}
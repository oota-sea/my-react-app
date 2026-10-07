
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Day2 from './pages/Day2.jsx'
import Quickstart from './pages/day2/Quickstart.jsx'
import TicTacToe from './pages/day2/TicTacToe.jsx'
import Day3 from './pages/Day3.jsx'
import ProductTable from './pages/day3/ProductTable.jsx'
import DescribingUi from './pages/day3/DescribingUi.jsx'

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day2" element={<Day2 />} />
      <Route path="/day2/quickstart" element={<Quickstart />} />
      <Route path="/day2/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/day3" element={<Day3 />} />
      <Route path="/day3/product-table" element={<ProductTable />} />
      <Route path="/day3/describing-ui" element={<DescribingUi />} />
    </Routes>
  )


export default App

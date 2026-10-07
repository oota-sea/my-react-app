
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Day3 from './pages/Day3.jsx'
import ProductTable from './pages/day3/ProductTable.jsx'
import DescribingUi from './pages/day3/DescribingUi.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day3" element={<Day3 />} />
      <Route path="/day3/product-table" element={<ProductTable />} />
      <Route path="/day3/describing-ui" element={<DescribingUi />} />
    </Routes>
  )
}

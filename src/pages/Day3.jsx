import { Link } from 'react-router-dom'

export default function Day3() {
  return (
    <>
      <h1>Day 3</h1>
      <ul>
        <li><Link to="/day3/product-table">React の流儀（商品表）</Link></li>
        <li><Link to="/day3/describing-ui">UI の記述（章全体）</Link></li>
      </ul>
      <p><Link to="/">← トップへ戻る</Link></p>
    </>
  )
}
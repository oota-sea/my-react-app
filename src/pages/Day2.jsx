import { Link } from 'react-router-dom'

export default function Day2() {
  return (
    <>
      <h1>Day 2</h1>
      <ul>
        <li><Link to="/day2/quickstart">クイックスタート</Link></li>
        <li><Link to="/day2/tic-tac-toe">三目並べ</Link></li>
      </ul>
      <p><Link to="/">← トップへ戻る</Link></p>
    </>
  )
}
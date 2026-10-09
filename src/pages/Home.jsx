import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h1>React 学習</h1>
      <ul>
        <li><Link to="/day2">Day 2</Link></li>
        <li><Link to="/day3">Day 3</Link></li>
      </ul>
    </>
  )
}
import { Link } from 'react-router-dom';
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function DescribingUi() {
  return (
    <>
      <h1>UI の記述（章全体）</h1>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004}/>
      </InspirationGenerator>
      <p><Link to="/day3">← Day 3 の目次へ戻る</Link></p>
    </>
  )
}
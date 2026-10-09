import {useState} from 'react';
import { Link } from 'react-router-dom';
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function DescribingUi() {
  const [language, setLanguage] = useState('ja');
  return (
    <>
      <h1>UI の記述（章全体）</h1>
      <div className="language-switch">
        <button
          className={language === 'ja' ? 'active' : ''}
          onClick={() => setLanguage('ja')}
        >
          日本語
        </button>
        <button
          className={language === 'en' ? 'active' : ''}
          onClick={() => setLanguage('en')}
        >
          English
        </button>
      </div>
      <FancyText title text={language === 'ja' ? "ひらめきを得るアプリ" : "Get Inspired App"} />
      <InspirationGenerator language={language}>
        <Copyright year={2004}/>
      </InspirationGenerator>
      <p><Link to="/day3">← Day 3 の目次へ戻る</Link></p>
    </>
  )
}
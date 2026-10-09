import * as React from 'react';
import inspirations from './inspirations';
import FancyText from './FancyText';
import Color from './Color';
export default function InspirationGenerator({children, language}){
  const [index, setIndex] = React.useState(0);
  const inspiration = inspirations[index];
  const next = () => setIndex((index + 1) % inspirations.length); 
  return(
    <>
      <p>
        {language === 'ja'
         ? `今日の${inspiration.type === 'quote' ? '名言' : 'カラー'}はこちら：`
         : `Your inspirational ${inspiration.type} is:`}</p>
      {inspiration.type === 'quote'
      ? <FancyText text={inspiration.value[language]} />
      : <Color value={inspiration.value} />}
      <button className="inspire-button" onClick={next}>
        {language === 'ja' ? 'もう一度ひらめく' : 'Inspire me again'}
      </button>
      {children}
    </>
  );
}
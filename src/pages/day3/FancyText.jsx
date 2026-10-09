export default function FancyText({title, text}){
  return title ? <h1>{text}</h1> : <h3>{text}</h3>
}
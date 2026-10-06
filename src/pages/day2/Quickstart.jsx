import { Link } from 'react-router-dom'
import './Quickstart.css'
import {useState} from 'react';

function MyAlertButton() {
  function handleClick(){
    alert('You clicked me!');
  }
  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Quickstart() {
  return (
    <>
      <h1>クイックスタート</h1>
      {<div>
       <h1>Welcome to my app</h1>
       <MyAlertButton />
       <Profile/>
       <ShoppingList/>
       <MyApp/>
       </div>}
      <p><Link to="/day2">← Day 2 の目次へ戻る</Link></p>
    </>
  );
}
export function Profile(){
  return (
    <>
      <h1>{user.name}</h1>
        <img
          className="avatar"
          src={user.imageUrl}
          alt={'Photo of' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize
          }}
        />
    </>
  );
}

// let content;
// if(isLogggedIn){
//   content = <AdminPanel/>;
// } else {
//   content = <LoginForm/>;
// }
// return (
//   <div>
//     {content}
//   </div>
// );

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export function ShoppingList(){
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export function MyApp(){
  const [count,setCount] = useState(0);
  function handleClick(){
    setCount(count + 1);
  }

  return(
    <div>
      <h1>Counters that update separately</h1>
      <MyButton count={count} onClick={handleClick}/>
      <MyButton count={count} onClick={handleClick}/>
    </div>
  );
}

function MyButton({count, onClick}){
  return(
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
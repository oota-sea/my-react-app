import { Link } from "react-router-dom";
import { useState } from "react";
export default function ProductTablePage() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <>
      <h1>React の流儀（商品表）</h1>
      <p>
        <Link to="/day3">← Day 3 の目次へ戻る</Link>
      </p>
      <SearchBar filterText={filterText} setFilterText={setFilterText} inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} />
      <ProductTable products={PRODUCTS} filterText={filterText} inStockOnly={inStockOnly} />
    </>
  );
}
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}
function ProductRow({ product }) {
  return (
    <tr>
      <td style={{color: product.stocked ? "black" :"red"}}>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
function SearchBar({filterText,setFilterText,inStockOnly,setInStockOnly}){
  return(
    <>
    <input type="text" placeholder="Search..." value={filterText} onChange={(e) => setFilterText(e.target.value)}/>
    <label>
      <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)}/>
      {' '}
      Only show products in stock
    </label>
    </>
  );
}
function ProductTable({products,filterText,inStockOnly}){
    const rows = [];
    let lastCategory = null;
    products.forEach((product) => {
      if(inStockOnly && !product.stocked){
        return;
      }
      if(!product.name.toLowerCase().includes(filterText.toLowerCase())){
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
}
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];
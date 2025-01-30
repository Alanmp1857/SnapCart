import "./App.css";
import Header from "./layout/Header/Header";
import Cart from "./pages/Checkout/Checkout";
import Category from "./pages/Category/Category";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProductList from "./pages/ProductList/ProductList";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/productlist" element={<ProductList />}></Route>
          <Route path="/product" element={<Product />}>
            <Route path=":id" element={<Product />}></Route>
          </Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

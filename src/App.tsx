import "./App.css";
import Header from "./layout/Header/Header";
import Cart from "./pages/Checkout/Checkout";
import Category from "./pages/Category/Category";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router";
// import ProductList from "./pages/ProductList/ProductList";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import Wallet from "./pages/Wallet/Wallet";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/productlist" element={<ProductList />}></Route> */}
          <Route path="/product" element={<Product />}>
            <Route path=":id" element={<Product />}></Route>
          </Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/category/:slug" element={<CategoryProducts />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

import "./App.css";
import Header from "./layout/Header/Header";
import Home from "./pages/Home/Home";
// import ItemCard from "./components/ItemCard";
import Product from "./pages/Product/Product";

function App() {
  return (
    <>
      {/* <ItemCard /> */}
      <Header />
      <Product />
      <Home />
    </>
  );
}

export default App;

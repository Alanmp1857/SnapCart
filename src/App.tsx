import "./App.css";
import SearchPage from "./components/SearchPage";
import Header from "./layout/Header/Header";
import Category from "./pages/Category/Category";
// import Home from "./pages/Home/Home";
// import ItemCard from "./components/ItemCard";
// import Product from "./pages/Product/Product";

function App() {
  return (
    <>
      {/* <ItemCard /> */}
      <Header />
      {/* <Product /> */}
      {/* <Home /> */}
      <SearchPage />
      <Category/>
    </>
  );
}

export default App;

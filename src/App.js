import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Navbars from "./components/Navbars"
import Product from "./components/Product"
import ProductDetail from "./components/ProductDetail"
import { connect } from "react-redux";
import { fetchProducts } from "./services/module/action";

const App = (props) => {

  useEffect(() => {
    props.getcloth();
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbars />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />}></Route>
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default connect(() => {}, {getcloth:fetchProducts})(App)
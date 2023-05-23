import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import ProductsList from "./components/products-list.component";
import AuctionsList from "./components/auctions-list.component";
import SalesList from "./components/sales-list.component";
import ShoppingList from "./components/shopping-list.component";
import Login from "./components/login.component";
import Logout from "./components/logout.component";
import Register from "./components/register.component";

class App extends Component {
  render() {
    if (!sessionStorage.getItem("token")) {
      return (
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/myproducts" element={<Login/>} />
          <Route path="/myproducts/add" element={<Login/>} />
          <Route path="/myproducts/:id" element={<Login/>} />
        </Routes>
      );
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Auctions
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/mysales"} className="nav-link">
                  My sales
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/myshopping"} className="nav-link">
                My shopping
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/myproducts"} className="nav-link">
                  My offers
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/logout"} className="nav-link">
                  Logout
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<AuctionsList/>} />
              <Route path="/myproducts" element={<ProductsList/>} />
              <Route path="/mysales" element={<SalesList/>} />
              <Route path="/myshopping" element={<ShoppingList/>} />
              <Route path="/myproducts/add" element={<AddProduct/>} />
              <Route path="/myproducts/:id" element={<Product/>} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="/register" element={<Register/>} />
            </Routes>
          </div>
        </div>
      );
    }
  }
}

export default App;


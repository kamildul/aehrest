import React, { Component } from "react";
import ProductDataService from "../services/products.service";
import { Link } from "react-router-dom";

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.state = {
      Poducts: [],
      currentProduct: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveProducts(sessionStorage.getItem("user_id"));
  }

  retrieveProducts(id) {
    ProductDataService.getAll(id)
      .then(response => {
        console.log(response);
        this.setState({
          Products: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProducts(sessionStorage.getItem("user_id"));
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }

  setActiveProduct(Product, index) {
    this.setState({
      currentProduct: Product,
      currentIndex: index
    });
  }

  render() {
    const { Products, currentProduct, currentIndex } = this.state;

    const ISO = (timeStamp=Date.now()) => {
      return new Date(timeStamp - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString().slice(0,-5).split('T')
    }

    return (
      <div className="list row">
        <div className="col-md-12">
          <Link to={"/myproducts/add"}>Add new offer</Link>
        </div>
        <div className="col-md-8">
          <h4>My products list</h4>
          <ul className="list-group">
            {Products &&
              Products.map((Product, index) => (
                <li className="list-group-item" key={Product.productId}>
                  {Product.endDate >= ISO()[0]+' '+ISO()[1] ? ("[Active]") : ("[Closed]")}
                  <Link onClick={() => this.setActiveProduct(Product, index)} key={index}>
                      {Product.title} 
                    </Link> {Product.customerId !=0 ? ("(purchase offer)") : ("")}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-4">
          {currentProduct ? (
            <div>
              <h4>Product details</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentProduct.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentProduct.description}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentProduct.price}
              </div>
              <div>
                <label>
                  <strong>Date end:</strong>
                </label>{" "}
                {currentProduct.endDate}
              </div>
              <div>
                <label>
                  <strong>Purchase offer:</strong>
                </label>{" "}
                {currentProduct.customerId !=0 && <small>{currentProduct.customerFirstName} {currentProduct.customerLastName}</small>}
              </div>
              {
                currentProduct.endDate >= ISO()[0]+' '+ISO()[1] ?
                  (
                    currentProduct.customerId == 0 ? 
                      (<Link to={"/myproducts/" + currentProduct.productId}>Edit</Link>):("")
                  ) : (
                    currentProduct.customerId == 0 ? 
                      (<Link to={"/myproducts/" + currentProduct.productId}>Add offer again</Link>):("")
                  )
              }
            </div>
          ) : (
            <div>
              <br />
              <p>Choose product to edit or delete...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

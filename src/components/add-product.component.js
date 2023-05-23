import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductsDataService from "../services/products.service";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      productId: null,
      title: "",
      description: "",
      price: "",
      endDate: "",

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeEndDate(e) {
    this.setState({
      endDate: e.target.value
    });
  }

  saveProduct() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      endDate: this.state.endDate,
      sessionKey: sessionStorage.getItem("token"),
      login: sessionStorage.getItem("login")
    };

    ProductsDataService.create(data)
      .then(response => {
        this.setState({
          productId: response.data.productId,
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          endDate: response.data.endDate,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      productId: null,
      title: "",
      description: "",
      price: "",
      endDate: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div className="col-md-12">
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add next new offer
            </button> or <Link to={"/myproducts"}>go to my products</Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">endDate</label>
              <input
                type="text"
                className="form-control"
                id="endDate"
                required
                value={this.state.endDate}
                onChange={this.onChangeEndDate}
                name="endDate"
              />
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
              Add new offer
            </button>
          </div>
        )}
      </div>
    );
  }
}

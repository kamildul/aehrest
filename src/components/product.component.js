import React, { Component } from "react";
import ProductDataService from "../services/products.service";
import { withRouter } from '../common/with-router';

class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeendDate = this.onChangeendDate.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        productId: null,
        title: "",
        description: "",
        price: "",
        endDate: ""
      },
      message: "",
      messagesType: "",
    };
  }

  componentDidMount() {
    this.getProduct(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        description: description
      }
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        price: price
      }
    }));
  }
  onChangeendDate(e) {
    const endDate = e.target.value;
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        endDate: endDate
      }
    }));
  }

  getProduct(id) {
    ProductDataService.get(id)
      .then(response => {
        this.setState({
          currentProduct: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduct() {
    this.state.currentProduct.sessionKey = sessionStorage.getItem("token");
    this.state.currentProduct.login = sessionStorage.getItem("login");
    console.log(this.state.currentProduct);
    ProductDataService.update(
      this.state.currentProduct
    )
      .then(response => {
        this.setState({
          message: "The Product was updated successfully!",
          messageType: "alert alert-success"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduct() {    
    ProductDataService.delete(this.state.currentProduct.productId)
      .then(response => {
        this.props.router.navigate('/myproducts');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            {this.state.message && (
              <div className={this.state.messageType} role="alert">{this.state.message}</div>
           )}
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentProduct.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProduct.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={currentProduct.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">Date end</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={currentProduct.endDate}
                  onChange={this.onChangeendDate}
                />
              </div>
            </form>
            <br />
            <center>
            <button
              className="btn btn-danger"
              onClick={this.deleteProduct}
            >
              Delete
            </button> <button
              className="btn btn-success"
              type="submit"
              onClick={this.updateProduct}
            >
              Update
            </button>
            </center>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Product);

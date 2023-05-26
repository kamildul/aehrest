import React, { Component } from "react";
import AuctionsDataService from "../services/auctions.service";

export default class AuctionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeNewPrice = this.onChangeNewPrice.bind(this);
    this.newOffer = this.newOffer.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      Poducts: [],
      message: "",
      messagesType: "",
      newPrice: ""
    };
  }

  onChangeNewPrice(e) {
    console.log(e);
    this.setState({
      
      newPrice: e.target.value
    });
  }

  newOffer(currentPrice,productId) {
    if(!this.state.newPrice) {
      this.setState({
        message: "Error! Your offer is empty.",
        messageType: "alert alert-danger"
      });
    } else if(this.state.newPrice <= currentPrice) {
      this.setState({
        message: "Error! Your price is too low.",
        messageType: "alert alert-danger"
      });
    } else {
      var data = {
        login: sessionStorage.getItem("login"),
        sessionKey: sessionStorage.getItem("token"),
        productId: productId,
        newProductPrice: this.state.newPrice
      };
      AuctionsDataService.bid(data)
      .then(response => {
        this.setState({
          message: "Success! You have added an offer.",
          messageType: "alert alert-success"
        });
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
    }
    
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  retrieveProducts() {
    AuctionsDataService.getAll()
      .then(response => {
        let filterArray = [];
        const ISO = (timeStamp=Date.now()) => {
          return new Date(timeStamp - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString().slice(0,-5).split('T')
        }
        response.data.forEach((row, index) => {
          if(row.userId != sessionStorage.getItem("user_id") && row.endDate > ISO()[0]+' '+ISO()[1])
          {
            filterArray.push(row);
          }
        });
        if(filterArray.length > 0) {
          this.setState({
            Products: filterArray
          });
        } else {
          this.setState({
            message: "No products.",
            messageType: "alert alert-info"
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProducts();
  }

  render() {
    const { Products } = this.state;
    return (
      <div className="list row">
        <div className="col-md-12">
          <h4>Active auctions</h4>
          {this.state.message && (
              <div className={this.state.messageType} role="alert">{this.state.message}</div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Auction ID</th>
                <th scope="col">Product</th>
                <th scope="col">End date</th>
                <th scope="col">Price</th>
                <th scope="col" colSpan="2">My offer</th>
              </tr>
            </thead>
            <tbody>
              {Products &&
                Products.map((Product, index) => (
                    <tr key={Product.productId}>
                        <td>{Product.productId}</td>
                        <td>{Product.title} <small>({Product.description != '' && (Product.description)})</small></td>
                        <td>{Product.endDate}</td>
                        <td>{Product.price}</td>
                       
                        <td>
                          {Product.customerId != sessionStorage.getItem("user_id") ? (
                            <input
                                type="number"
                                className={`form-control newPrice_${Product.productId}`}
                                required
                                
                                onChange={this.onChangeNewPrice}
                                name={`newPrice_${Product.productId}`}
                                id={`newPrice_${Product.productId}`}
                              />
                          ) : (
                            <p><small>Your bid is the highest</small></p>
                          )}
                        </td>
                        <td>
                          {Product.customerId != sessionStorage.getItem("user_id") &&
                            <button onClick={() => this.newOffer(Product.price,Product.productId)} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Add</button>
                          }
                         </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

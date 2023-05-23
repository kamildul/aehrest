import React, { Component } from "react";
import AuctionsDataService from "../services/auctions.service";

export default class AuctionsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.state = {
      Poducts: []
    };
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
          if(row.customerId == sessionStorage.getItem("user_id") && row.endDate < ISO()[0]+' '+ISO()[1])
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

  render() {
    const { Products } = this.state;
    return (
      <div className="list row">
        <div className="col-md-12">
          <h4>My shopping</h4>
          {this.state.message && (
              <div className={this.state.messageType} role="alert">{this.state.message}</div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Auction ID</th>
                <th scope="col">Title</th>
                <th scope="col">Purchase date</th>
                <th scope="col">Price</th>
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
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

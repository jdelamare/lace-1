import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/AssetCreationPage.css'

class AssetCreationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            sku: '',
            model: '',
            size: '',
            manufactureDate: '',
            showSizeMenu: false
        }
        this.showSizeMenu = this.showSizeMenu.bind(this);
        this.closeSizeMenu = this.closeSizeMenu.bind(this);
        this.setSize = this.setSize.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showSizeMenu(event) {
      event.preventDefault();

      this.setState({ showSizeMenu: true }, () => {
        document.addEventListener('click', this.closeSizeMenu);
      });
    }

    closeSizeMenu() {
      this.setState({ showSizeMenu: false }, () => {
        document.removeEventListener('click', this.closeSizeMenu);
      });
    }

    setSize(event) {
      event.preventDefault();
      this.setState({ size: event.target.id });
    }

    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    /*
      This function should call the batcher to create a transaction.
    */
    handleSubmit(event) {
      alert(
        "Product Info\nID: " + this.state.id +
        "\nSKU: " + this.state.sku +
        "\nModel: " + this.state.model +
        "\nSize: " + this.state.size + 
        "\nManufacture Date: " + this.state.manufactureDate
      );
      fetch('/api/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.state.model,
          size: this.state.size,
          sku: this.state.sku,
          product: this.state.id,
          date: this.state.manufactureDate
        })
      }).then(function(response){
        response.json().then(body => document.getElementById("button").innerHTML = body.link
        );
        document.getElementById("button").className = 'show';
      });
      event.preventDefault();
    }

    render() {
        return (
          <div className="AssetCreationPage">
            <form onSubmit={this.handleSubmit}>
              <legend>Asset Creation Form</legend>
              <div className="form-group">
                <label>Product ID</label>
                <input 
                  type="text" 
                  name="id"
                  placeholder="Product ID"
                  onChange={this.handleChange} 
                  required
                />
              </div>
              <div className="form-group">
                <label>SKU:&emsp;</label>
                <input 
                  type="text" 
                  name="sku" 
                  placeholder="SKU"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="row">
                    <div className="form-group">
                    <label>Model</label>
                    <input 
                      type="text" 
                      name="model" 
                      placeholder="Model"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                  <div>
                    <label>Size</label>
                    <div className="size-btn" onClick={this.showSizeMenu}>
                      > {this.state.size}
                      </div>
                    {
                      this.state.showSizeMenu
                      ? (
                        <div className="dropdown-menu">
                          <div className="dropdown-cell size-t-l" id="7" onClick={this.setSize}> 7 </div>
                          <div className="dropdown-cell" id="7.5" onClick={this.setSize}> 7.5 </div>
                          <div className="dropdown-cell" id="8" onClick={this.setSize}> 8 </div>
                          <div className="dropdown-cell" id="8.5" onClick={this.setSize}> 8.5 </div>
                          <div className="dropdown-cell size-t-r" id="9" onClick={this.setSize}> 9 </div>
                          <div className="dropdown-cell" id="9.5" onClick={this.setSize}> 9.5 </div>
                          <div className="dropdown-cell" id="10" onClick={this.setSize}> 10 </div>
                          <div className="dropdown-cell" id="10.5" onClick={this.setSize}> 10.5 </div>
                          <div className="dropdown-cell" id="11" onClick={this.setSize}> 11 </div>
                          <div className="dropdown-cell" id="11.5" onClick={this.setSize}> 11.5 </div>
                          <div className="dropdown-cell size-b-l" id="12" onClick={this.setSize}> 12 </div>
                          <div className="dropdown-cell" id="12.5" onClick={this.setSize}> 12.5 </div>
                          <div className="dropdown-cell" id="13" onClick={this.setSize}> 13 </div>
                          <div className="dropdown-cell" id="14" onClick={this.setSize}> 14 </div>
                          <div className="dropdown-cell no-hover size-b-r" id="0"> </div>
                        </div>
                      ) : ( null )
                    }
                  </div>
                </div>
              </div>

              <div className="row">
              <div className="form-group">
                    <label>Manufacture Date</label>
                    <input 
                      type="date" 
                      name="manufactureDate" 
                      placeholder="Manufature Date"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
              </div>
              <div className="btn-submit">
                <input type="submit" value="Submit" />
              </div>
            </form>
            <p5 id="button" className="hidden" data-toggle="collapse" data-target="#status"></p5>
            <div id="status">
            </div>
          </div>
        );
      }
}

export default AssetCreationPage;

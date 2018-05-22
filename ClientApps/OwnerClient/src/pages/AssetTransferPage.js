import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/AssetTransferPage.css'

class AssetTransferPage extends Component {
  constructor(props) {
    super(props);
        this.state = {
            rfid: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(
      "Touch Asset \nAsset ID: " + this.state.rfid
    );
  
  fetch('/api/touch/Company', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rfid: this.state.rfid,
    })
  })
  .then(response => console.log(response));
    event.preventDefault();
  }

  render() {
      return (
        <div className="AssetTransferPage">
          <form onSubmit={this.handleSubmit}>
            <legend>Asset Transfer Form</legend>
            <div className="form-group">
              <label>RFID</label>
              <input 
                type="text" 
                name="rfid"
                placeholder="RFID"
                onChange={this.handleChange} 
                required
              />
            </div>
            
            <div className="btn-submit">
              <input type="submit" value="Submit" />
            </div>
          </form>
          <div>
          </div>
        </div>
      );
    }
}

export default AssetTransferPage
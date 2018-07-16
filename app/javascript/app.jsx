import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios';

import Campaign from './campaign';
import TitleBar from './title-bar';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      campaigns: [],
      grandTotal: 0,
      loadedData: false,
      filterValue: ''
    };
  }

  responseHandler = response => {
    const calculatedGrandTotal = response.data.reduce(
      (acc, { billableAmount }) => { return acc + billableAmount },
      0
    );

    this.setState(
      {
        campaigns: response.data,
        grandTotal: calculatedGrandTotal,
        loadedData: true
      }
    );
  }

  componentDidMount() {
    // Hardcoded URL is less good. An SPA would ideally use something
    // like React Router to handle this better. Or a wrapper around all requests
    // so that this could be configured and referenced from one place.
    axios.get('http://localhost:3000/campaigns').then(this.responseHandler);
  }

  handleFilterChange = filterValue => {
    this.setState({ loadedData: false });
    axios.get('http://localhost:3000/campaigns', {
      params: {
        campaign_name: filterValue
      }
    }).then(this.responseHandler)
  }

  render() {
    const { campaigns, grandTotal, loadedData } = this.state;

    return (
      <div>
        {<TitleBar grandTotal={grandTotal} onFilterChange={this.handleFilterChange}/>}
        {loadedData ? campaigns.map(campaign => <Campaign key={campaign.id} {...campaign}/>) : <div className="loading">Loading...</div>}
      </div>
    );
  }
}
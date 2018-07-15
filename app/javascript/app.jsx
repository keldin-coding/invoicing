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
      allCampaigns: [], 
      allGrandTotal: 0, 
      grandTotal: 0, 
      loadedData: false, 
      filterValue: '' 
    };
  }

  calculateGrandTotal(campaigns) {
    return campaigns.reduce(
      (acc, { billableAmount }) => { return acc + billableAmount },
      0
    );
  }

  componentDidMount() {
    // Hardcoded URL is less good. An SPA would ideally use something
    // like React Router to handle this better. Or a wrapper around all requests
    // so that this could be configured and referenced from one place.
    axios.get('http://localhost:3000/campaigns')
      .then(response => { 
        const calculatedGrandTotal = this.calculateGrandTotal(response.data);

        this.setState(
          { 
            allCampaigns: response.data, 
            campaigns: response.data,
            allGrandTotal: calculatedGrandTotal,
            grandTotal: calculatedGrandTotal,
            loadedData: true
          }
        )
      });
  }

  handleFilterChange = (newFilterValue) => {
    const { filterValue, allCampaigns, campaigns: previousCampaigns, allGrandTotal } = this.state;
    const normalizedFilterValue = newFilterValue.toLowerCase();

    console.log(`old value: ${filterValue} and new value: ${normalizedFilterValue}`);

    // Between debounces, nothing changed.
    if (filterValue === normalizedFilterValue) {
      return;
    }

    // Reset case
    if (normalizedFilterValue.length === 0) {
      return this.setState({
        campaigns: allCampaigns,
        filterValue: '',
        grandTotal: allGrandTotal
      });
    } 

    const baseForNextCampaigns = normalizedFilterValue.startsWith(normalizedFilterValue) ? previousCampaigns : allCampaigns;
    const nextCampaigns = baseForNextCampaigns.filter(({ name }) => name.toLowerCase().startsWith(normalizedFilterValue));

    this.setState({
      filterValue: normalizedFilterValue,
      campaigns: nextCampaigns,
      grandTotal: this.calculateGrandTotal(nextCampaigns)
    });
  }

  render() {
    const { campaigns, grandTotal, loadedData } = this.state;

    return (
      <div>
        {loadedData && <TitleBar grandTotal={grandTotal} onFilterChange={this.handleFilterChange}/>}
        {campaigns.map(campaign => <Campaign key={campaign.id} {...campaign}/>)}
      </div>
    );
  }
}
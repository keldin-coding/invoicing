import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios';

import Campaign from './campaign';
import TitleBar from './title-bar';
import LoadMoreButton from './load-more-button';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      campaigns: [],
      grandTotal: 0,
      loadedData: false,
      filterValue: '',
      page: 1
    };
  }

  responseHandler = response => {
    this.setState((prevState) => {
      const { campaigns, grandTotal } = prevState;

      {
        return {
          campaigns: campaigns.concat(response.data.campaigns),
          loadedData: true,
          moreResults: response.data.moreResults,
          grandTotal: response.data.grandTotal
        }
      }
    });
  }

  componentDidMount() {
    // Hardcoded URL is less good. An SPA would ideally use something
    // like React Router to handle this better. Or a wrapper around all requests
    // so that this could be configured and referenced from one place.
    this.makeRequest({ page: 1, campaignName: '' });
  }

  makeRequest = ({ page, campaignName }) => {
    axios.get('http://localhost:3000/campaigns', {
      params: {
        campaign_name: campaignName,
        page
      }
    }).then(this.responseHandler)
  }

  handleFilterChange = filterValue => {
    this.setState({ loadedData: false, page: 1, filterValue, campaigns: [] });

    this.makeRequest({ page: 1, campaignName: filterValue })
  }

  handleLoadMore = () => {
    this.setState((prevState) => {
      const { page, filterValue: campaignName } = prevState;

      const newPage = prevState.page + 1

      this.makeRequest({ page: newPage, campaignName });

      return { page: newPage };
    });
  }

  render() {
    const { campaigns, grandTotal, loadedData, moreResults } = this.state;

    return (
      <div>
        {<TitleBar grandTotal={grandTotal} onFilterChange={this.handleFilterChange}/>}
        {loadedData ? campaigns.map(campaign => <Campaign key={campaign.name} {...campaign}/>) : <div className="loading">Loading...</div>}
        <LoadMoreButton loadingData={!loadedData} moreResults={moreResults} onClick={this.handleLoadMore} />
      </div>
    );
  }
}
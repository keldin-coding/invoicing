import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios';

import Campaign from './campaign';
import TitleBar from './title-bar';
import LoadMoreButton from './load-more-button';
import randomString from './random-string';
import Alert from './alert';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      campaigns: [],
      grandTotal: 0,
      loadedData: false,
      filterValue: '',
      page: 1,
      alerts: []
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
    this.requestCampaigns({ page: 1, campaignName: '' });
  }

  handleSuccessfulSave = () => {
    this.setState((prevState) => {
      const alertId = randomString(8);

      return {
        alerts: prevState.alerts.concat(
          <Alert
          key={alertId}
          id={alertId}
          message="Your changes have been saved!"
          type="success"
          onClick={this.handleAlertClick}
        />
        )
      };
    });
  }

  handleFailedSave = () => {
    this.setState((prevState) => {
      const alertId = randomString(8);

      return {
        alerts: prevState.alerts.concat(
          <Alert
            key={alertId}
            id={alertId}
            message="Something went wrong when saving your changes."
            type="error"
            onClick={this.handleAlertClick}
          />
        )
      };
    });
  }

  handleAlertClick = (id) => {
    this.setState((prevState) => {
      return {
        alerts: prevState.alerts.filter((comp) => comp.props.id !== id)
      };
    });
  }

  requestCampaigns = ({ page, campaignName }) => {
    axios.get('http://localhost:3000/campaigns', {
      params: {
        campaign_name: campaignName,
        page
      }
    }).then(this.responseHandler)
  }

  handleFilterChange = filterValue => {
    this.setState({ loadedData: false, page: 1, filterValue, campaigns: [] });

    this.requestCampaigns({ page: 1, campaignName: filterValue })
  }

  handleLoadMore = () => {
    this.setState((prevState) => {
      const { page, filterValue: campaignName } = prevState;

      const newPage = prevState.page + 1

      this.requestCampaigns({ page: newPage, campaignName });

      return { page: newPage };
    });
  }

  renderCampaigns() {
    const { campaigns } = this.state;

    return campaigns.map(campaign => {
      return (<Campaign
        key={campaign.name}
        notifySuccessfulSave={this.handleSuccessfulSave}
        notifyFailedSave={this.handleFailedSave}
        onCampaignSave={this.handleCampaignSaved}
        {...campaign}
      />);
    });
  }

  render() {
    const { grandTotal, loadedData, moreResults, alerts } = this.state;

    return (
      <div>
        <div id="alert-container">
          {alerts}
        </div>
        {<TitleBar grandTotal={grandTotal} onFilterChange={this.handleFilterChange}/>}
        {!!loadedData ? this.renderCampaigns() : <div className="loading">Loading...</div>}
        <LoadMoreButton loadingData={!loadedData} moreResults={moreResults} onClick={this.handleLoadMore} />
      </div>
    );
  }
}
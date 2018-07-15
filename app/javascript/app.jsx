import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios';

import Campaign from './campaign';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { campaigns: [] };
  }

  componentDidMount() {
    // Hardcoded URL is less good. An SPA would ideally use something
    // like React Router to handle this better. Or a wrapper around all requests
    // so that this could be configured and referenced from one place.
    axios.get('http://localhost:3000/campaigns')
      .then(response => { 
        this.setState({ campaigns: response.data })
      });
  }

  render() {
    const { campaigns } = this.state;

    return (
      <div>
        {campaigns.map(campaign => <Campaign key={campaign.id} {...campaign}/>)}
      </div>
    );
  }
}
import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios';

import LineItemTable from './line-item-table';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { lineItems: [] };
  }

  componentDidMount() {
    // Hardcoded URL is less good. An SPA would ideally use something
    // like React Router to handle this better. Or a wrapper around all requests
    // so that this could be configured and referenced from one place.
    axios.get('http://localhost:3000/line_items')
      .then(response => { 
        console.log(response); 
        this.setState({ lineItems: response.data.line_items })
      });
  }

  render() {
    const { lineItems } = this.state;

    return <LineItemTable lineItems={lineItems} />;
  }
}
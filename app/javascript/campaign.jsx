import React from 'react';
import PropTypes from 'prop-types';

import LineItemTable from './line-item-table';
import currencyFormat from './currency-format';

import axios from 'axios';

export default class Campaign extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { ...this.props };
  }
  static get propTypes() {
    const { shape, string, arrayOf, number, func, bool } = PropTypes;

    return {
      id: number.isRequired,
      name: string.isRequired,
      lineItems: arrayOf(
        shape({
          id: number,
          name: string,
          campaignName: string,
          bookedAmount: number,
          actualAmount: number,
          adjustments: number,
          reviewed: bool
        })
      ).isRequired,
      billableAmount: number.isRequired,
      notifySuccessfulSave: func.isRequired,
      notifyFailedSave: func.isRequired
    };
  }

  get reviewed() {
    const { lineItems } = this.state;

    return lineItems.every(({ reviewed }) => reviewed);
  }

  markReviewed = async () => {
    const { notifyFailedSave, notifySuccessfulSave, onCampaignSave } = this.props;
    const { id } = this.state;

    axios.patch(
      `http://localhost:3000/campaigns/${id}`, { reviewed: true }
    ).then((response) => {
      this.setState({ ...response.data });

      notifySuccessfulSave();
    }).catch(notifyFailedSave)
  }

  render() {
    const {
      id,
      name,
      billableAmount,
      lineItems,
      notifySuccessfulSave,
      notifyFailedSave,
      onCampaignSave
    } = this.state;

    const { reviewed } = this;

    return (
      <div id={`campaign-${id}`}>
        <h2 className="campaign-header">
          {name}
          <span className="badge badge-info">
            {currencyFormat(billableAmount)}
          </span>
          {!reviewed && <button className="btn btn-primary ml-3" onClick={this.markReviewed}>Mark Reviewed</button>}
        </h2>
        <LineItemTable
          lineItems={lineItems}
          notifySuccessfulSave={notifySuccessfulSave}
          notifyFailedSave={notifyFailedSave}
        />
      </div>
    );
  }
}
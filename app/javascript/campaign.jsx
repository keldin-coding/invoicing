import React from 'react';
import PropTypes from 'prop-types';

import LineItemTable from './line-item-table';
import currencyFormat from './currency-format';

export default class Campaign extends React.Component {
  static get propTypes() {
    const { shape, string, arrayOf, number, func } = PropTypes;

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
          adjustments: number
        })
      ).isRequired,
      billableAmount: number.isRequired,
      notifySuccessfulSave: func.isRequired,
      notifyFailedSave: func.isRequired
    };
  }

  render() {
    const { id, name, billableAmount, lineItems, notifySuccessfulSave, notifyFailedSave } = this.props;

    return (
      <div id={`campaign-${id}`}>
        <h2 className="campaign-header">
          {name}
          <span className="badge badge-info">
            {currencyFormat(billableAmount)}
          </span>
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
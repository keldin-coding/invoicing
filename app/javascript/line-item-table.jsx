import React from 'react'
import PropTypes from 'prop-types'

import LineItemRowController from './line-item-row-controller';

export default class LineItemTable extends React.Component {
  static get propTypes() {
    const { shape, number, string, arrayOf, func, bool } = PropTypes;

    return {
      lineItems: arrayOf(
        shape({
          id: number,
          name: string,
          bookedAmount: number,
          actualAmount: number,
          adjustments: number,
          billableAmount: number,
          reviewed: bool
        })
      ),
      notifySuccessfulSave: func.isRequired,
      notifyFailedSave: func.isRequired
    };
  }

  static get defaultProps() {
    return { lineItems: [] };
  }

  render() {
    const { lineItems, notifySuccessfulSave, notifyFailedSave } = this.props;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Booked Amount</th>
            <th>Actual Amount</th>
            <th>Adjustments</th>
            <th>Billable Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            lineItems.map(item =>
              <LineItemRowController
                key={item.id}
                notifySuccessfulSave={notifySuccessfulSave}
                notifyFailedSave={notifyFailedSave}
                {...item}
              />
            )
          }
        </tbody>
      </table>
    );
  }
}
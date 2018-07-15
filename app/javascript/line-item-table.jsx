import React from 'react'
import PropTypes from 'prop-types'

import LineItemRow from './line-item-row';

export default class LineItemTable extends React.Component {
  static get propTypes() {
    const { shape, number, string, arrayOf } = PropTypes;

    return {
      lineItems: arrayOf(
        shape({
          id: number, 
          name: string,
          bookedAmount: number, 
          actualAmount: number, 
          adjustments: number,
          billableAmount: number
        })
      )
    };
  }

  static get defaultProps() {
    return { lineItems: [] };
  }

  render() {
    const { lineItems } = this.props;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Booked Amount</th>
            <th>Actual Amount</th>
            <th>Adjustments</th>
            <th>Billable Amount</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map(item => <LineItemRow key={item.id} {...item}/>)}
        </tbody>
      </table>
    );
  }
}
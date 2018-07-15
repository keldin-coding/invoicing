import React from 'react';
import PropTypes from 'prop-types';

import currencyFormat from './currency-format';

export default class LineItemRow extends React.Component {
  static get propTypes() {
    const { number, string } = PropTypes;

    return {
      id: number.isRequired,
      name: string.isRequired,
      bookedAmount: number.isRequired, 
      actualAmount: number.isRequired, 
      adjustments: number.isRequired,
      billableAmount: number.isRequired
    };
  }

  render() {
    const { id, name, bookedAmount, actualAmount, adjustments, billableAmount } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{currencyFormat(bookedAmount)}</td>
        <td>{currencyFormat(actualAmount)}</td>
        <td>{currencyFormat(adjustments)}</td>
        <td>{currencyFormat(billableAmount)}</td>
      </tr>
    );
  }
}
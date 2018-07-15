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
          campaignName: string, 
          bookedAmount: number, 
          actualAmount: number, 
          adjustments: number 
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
          </tr>
        </thead>
        <tbody>
          {lineItems.map(item => <LineItemRow {...item}/>)}
        </tbody>
      </table>
    );
  }
}
import React from 'react';
import PropTypes from 'prop-types';

import currencyFormat from './currency-format';

export default class LineItemRow extends React.Component {
  static get propTypes() {
    const { number, string, func, bool, oneOfType } = PropTypes;

    return {
      id: number.isRequired,
      name: string.isRequired,
      bookedAmount: number.isRequired,
      actualAmount: number.isRequired,
      adjustments: oneOfType([number, string]).isRequired,
      billableAmount: number.isRequired,
      reviewed: bool.isRequired,
      editing: bool.isRequired,
      onMarkReviewed: func.isRequired,
      onEditClick: func.isRequired,
      onValueChange: func.isRequired
    };
  }

  handleValueChange = (event) => {
    this.props.onValueChange(event.target.value);
  }

  renderAdjustments() {
    const { editing, adjustments, id } = this.props;

    if (editing) {
      return <input value={adjustments} onChange={this.handleValueChange}/>
    }

    return currencyFormat(adjustments);
  }

  renderActions() {
    const { editing, reviewed, onEditClick, onMarkReviewed } = this.props;

    if (reviewed) {
      return <span>REVIEWED</span>;
    }

    const editButtonText = editing ? 'Save' : 'Edit';

    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={onEditClick}>{editButtonText}</button>
        <button className="btn btn-primary ml-1" onClick={onMarkReviewed}>Mark reviewed</button>
      </React.Fragment>
    );
  }

  render() {
    const { id, name, bookedAmount, actualAmount, billableAmount } = this.props;


    return (
      <tr>
        <td>{name}</td>
        <td>{currencyFormat(bookedAmount)}</td>
        <td>{currencyFormat(actualAmount)}</td>
        <td>{this.renderAdjustments()}</td>
        <td>{currencyFormat(billableAmount)}</td>
        <td>{this.renderActions()}</td>
      </tr>
    );
  }
}
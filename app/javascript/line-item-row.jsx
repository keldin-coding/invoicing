import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import currencyFormat from './currency-format';

export default class LineItemRow extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      adjustmentValue: this.props.adjustments,
      adjustmentInputValue: this.props.adjustments,
      editing: false
    };
  }

  static get propTypes() {
    const { number, string, func } = PropTypes;

    return {
      id: number.isRequired,
      name: string.isRequired,
      bookedAmount: number.isRequired,
      actualAmount: number.isRequired,
      adjustments: number.isRequired,
      billableAmount: number.isRequired,
      notifySuccessfulSave: func.isRequired,
      notifyFailedSave: func.isRequired
    };
  }

  get adjustmentsId() {
    const { id } = this.props;

    return `${id}-adjustments`;
  }

  saveAdjustments = () => {
    const { id, notifySuccessfulSave, notifyFailedSave } = this.props;
    const { adjustmentInputValue: newValue } = this.state;

    axios.patch(
      `http://localhost:3000/line_items/${id}`,
      { adjustments: newValue }
    ).then(() => {
      this.setState({ adjustmentValue: newValue, editing: false });

      notifySuccessfulSave();
    }).catch(() => {
      this.setState((prevState) => ({ editing: false, adjustmentInputValue: prevState.adjustmentValue }));

      notifyFailedSave();
    })
  }

  allowEditing = () => {
    this.setState({ editing: true });
  }

  handleValueChange = (event) => {
    const { value } = event.target;

    this.setState({ adjustmentInputValue: value });
  }

  renderAdjustments() {
    const { editing, adjustmentInputValue, adjustmentValue } = this.state;
    const { id } = this.props;

    if (editing) {
      return <input id={`${id}-adjustments`} value={adjustmentInputValue} onChange={this.handleValueChange}/>
    }

    return currencyFormat(adjustmentValue);
  }

  renderEditButton() {
    const { editing } = this.state;

    const buttonText = editing ? 'Save' : 'Edit';
    const clickHandler = editing ? this.saveAdjustments : this.allowEditing;

    return <button className="btn btn-primary" onClick={clickHandler}>{buttonText}</button>
  }

  render() {
    const { id, name, bookedAmount, actualAmount, billableAmount } = this.props;
    const { adjustmentValue } = this.state;


    return (
      <tr>
        <td>{name}</td>
        <td>{currencyFormat(bookedAmount)}</td>
        <td>{currencyFormat(actualAmount)}</td>
        <td>{this.renderAdjustments()}</td>
        <td>{currencyFormat(billableAmount)}</td>
        <td>{this.renderEditButton()}</td>
      </tr>
    );
  }
}
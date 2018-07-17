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
      editing: false,
      reviewed: this.props.reviewed
    };
  }

  static get propTypes() {
    const { number, string, func, bool } = PropTypes;

    return {
      id: number.isRequired,
      name: string.isRequired,
      bookedAmount: number.isRequired,
      actualAmount: number.isRequired,
      adjustments: number.isRequired,
      billableAmount: number.isRequired,
      reviewed: bool.isRequired,
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
    });
  }

  allowEditing = () => {
    this.setState({ editing: true });
  }

  handleValueChange = (event) => {
    const { value } = event.target;

    this.setState({ adjustmentInputValue: value });
  }

  markReviewed = () => {
    const { id, notifySuccessfulSave, notifyFailedSave } = this.props;

    axios.patch(
      `http://localhost:3000/line_items/${id}`,
      { reviewed: true }
    ).then(() => {
      this.setState({ reviewed: true, editing: false });

      notifySuccessfulSave();
    }).catch(() => {
      this.setState({ editing: false });
      notifyFailedSave();
    });
  }

  renderAdjustments() {
    const { editing, adjustmentInputValue, adjustmentValue } = this.state;
    const { id } = this.props;

    if (editing) {
      return <input id={`${id}-adjustments`} value={adjustmentInputValue} onChange={this.handleValueChange}/>
    }

    return currencyFormat(adjustmentValue);
  }

  renderActions() {
    const { editing, reviewed } = this.state;

    if (reviewed) {
      return <span>REVIEWED</span>;
    }

    const editButtonText = editing ? 'Save' : 'Edit';
    const editClickHandler = editing ? this.saveAdjustments : this.allowEditing;

    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={editClickHandler}>{editButtonText}</button>
        <button className="btn btn-primary ml-1" onClick={this.markReviewed}>Mark reviewed</button>
      </React.Fragment>
    );
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
        <td>{this.renderActions()}</td>
      </tr>
    );
  }
}
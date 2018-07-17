import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import _ from 'underscore';

import LineItemRow from './line-item-row';

export default class LineItemRowController extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      editing: false,
      adjustmentValue: this.props.adjustments,
      ...this.props
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

  // This is indicative of some less-than-good state management in this application.
  componentDidUpdate(prevProps) {
    if (prevProps.reviewed !== this.props.reviewed && this.props.reviewed !== this.state.reviewed) {
      this.setState({ reviewed: this.props.reviewed });
    }
  }

  markReviewed = () => {
    const { id } = this.state;
    const { notifySuccessfulSave, notifyFailedSave } = this.props;

    axios.patch(
      `http://localhost:3000/line_items/${id}`,
      { reviewed: true }
    ).then((response) => {
      this.setState({ editing: false, ...response.data });

      notifySuccessfulSave();
    }).catch(() => {
      this.setState({ editing: false });
      notifyFailedSave();
    });
  }

  saveAdjustments = () => {
    const { notifySuccessfulSave, notifyFailedSave } = this.props;
    const { adjustments: newValue, id } = this.state;

    axios.patch(
      `http://localhost:3000/line_items/${id}`,
      { adjustments: newValue }
    ).then((response) => {
      this.setState({ editing: false, adjustmentValue: response.data.adjustments, ...response.data });

      notifySuccessfulSave();
    }).catch(() => {
      this.setState((prevState) => ({ editing: false, adjustments: prevState.adjustmentValue }));

      notifyFailedSave();
    });
  }

  allowEditing = () => {
    this.setState({ editing: true });
  }

  handleEditClick = () => {
    const { editing } = this.state;

    if (!editing) {
      this.allowEditing();
    } else {
      this.saveAdjustments();
    }
  }

  handleValueChange = value => {
    this.setState({ adjustments: value });
  }

  render() {
    const {
      id,
      name,
      bookedAmount,
      actualAmount,
      billableAmount,
      reviewed,
      editing,
      adjustments
    } = this.state;

    return (
      <LineItemRow
        id={id}
        name={name}
        bookedAmount={bookedAmount}
        actualAmount={actualAmount}
        reviewed={reviewed}
        adjustments={adjustments}
        billableAmount={billableAmount}
        editing={editing}
        onMarkReviewed={this.markReviewed}
        onEditClick={this.handleEditClick}
        onValueChange={this.handleValueChange}
      />
    );
  }
}
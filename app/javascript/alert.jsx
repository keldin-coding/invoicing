import React from 'react';
import PropTypes from 'prop-types';

export default class Alert extends React.Component {
  static get propTypes() {
    const { string, func } = PropTypes;

    return {
      id: string,
      message: string.isRequired,
      type: string.isRequired,
      onClick: func.isRequired
    };
  }

  get alertClass() {
    const { type } = this.props;

    const colorType = type === 'success' ? 'success' : 'danger';

    return `alert alert-dismissible fade show alert-${colorType}`;
  }

  handleClick = () => {
    this.props.onClick(this.alertId);
  }

  render() {
    const { message, id } = this.props;

    return (
      <div className={this.alertClass} id={id} role="alert">
        <span>{message}</span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleClick}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}
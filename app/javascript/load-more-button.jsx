import React from 'react';
import PropTypes from 'prop-types';

export default class LoadMoreButton extends React.Component {
  static get propTypes() {
    const { bool, func } = PropTypes;

    return {
      loadingData: bool,
      moreResults: bool,
      onClick: func.isRequired
    };
  }

  render() {
    const { loadingData, onClick, moreResults } = this.props;

    return (
      <button className="btn btn-primary btn-block" disabled={loadingData || !moreResults} onClick={onClick}>
        {loadingData ? 'Loading...' : 'Load More' }
      </button>
    );
  }

}
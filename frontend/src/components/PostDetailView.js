import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PostDetailView = ({ match }) => (
  <div className="post-detail-view">
    Hello Post Detail View
  </div>
);

PostDetailView.propTypes = {
  match: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { posts, comments } = state;
  return {
    posts,
    comments,
  };
};

export default connect(mapStateToProps)(PostDetailView);

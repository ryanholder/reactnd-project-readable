import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostDetailViewNavigation from './PostDetailViewNavigation';

const PostDetailView = ({ match, history }) => (
  <div className="post-detail-view">
    <PostDetailViewNavigation
      category={match.params.category || 'all'}
      history={history}
    />
  </div>
);

PostDetailView.propTypes = {
  match: PropTypes.array.isRequired,
  history: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const { posts, comments } = state;
  return {
    posts,
    comments,
  };
};

export default connect(mapStateToProps)(PostDetailView);

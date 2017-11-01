import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import PostCommentCount from './PostCommentCount';
import PostVoteCount from './PostVoteCount';
import PostDetailViewNavigation from './PostDetailViewNavigation';
import PostHeader from './PostHeader';
import PostContent from './PostContent';

const PostDetailView = ({ match, history }) => (
  <div className="post-detail-view">
    <PostDetailViewNavigation
      category={match.params.category || 'all'}
      history={history}
      postId={match.params.id}
    />
    <Card className="card-container">
      <PostHeader
        title={'Learn Redux in 10 minutes!'}
        author={'author'}
        date={'May'}
        // voteCount={post.voteScore}
        // postId={post.id}
      />
      <PostContent
        content={'body'}
      />
    </Card>
  </div>
);

PostDetailView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { posts, comments } = state;
  return {
    posts,
    comments,
  };
};

export default connect(mapStateToProps)(PostDetailView);

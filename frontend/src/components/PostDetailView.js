import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import PostDetailViewNavigation from './PostDetailViewNavigation';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostComments from './PostComments';

const PostDetailView = (props) => {
  const { match, history, posts } = props;
  const activePost = posts.items
    .filter(post => post.id === match.params.id)
    .reduce((acc, cur) => Object.assign(acc, cur), {});

  return (
    <div className="post-detail-view">
      <PostDetailViewNavigation
        category={match.params.category || 'all'}
        history={history}
        postId={activePost.id}
      />
      <Card className="card-container">
        <PostHeader
          title={activePost.title}
          author={activePost.author}
          date={activePost.timestamp}
          voteCount={activePost.voteScore}
          postId={activePost.id}
        />
        <PostContent
          content={activePost.body}
        />
      </Card>
      <PostComments
        postId={activePost.id}
      />
    </div>
  );
};

PostDetailView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  posts: PropTypes.shape({
    items: PropTypes.array,
    activePost: PropTypes.object,
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

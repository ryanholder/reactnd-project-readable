import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

class Posts extends Component {
  // && !posts.items.deleted

  filterByCategory = (post) => {
    if (!post.deleted) {
      const { category } = this.props;
      if (category !== 'all') {
        return post.category === category;
      }
      return true;
    }
    return false;
  }

  handleGetCommentCount = (postId) => {
    const { comments } = this.props;
    if (comments.items[postId]) {
      return comments.items[postId].length;
    }

    return 0;
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts.items.filter(this.filterByCategory).map(post => (
          <Card key={post.id} className="card-container">
            <Link
              to={`/${post.category}/${post.id}`}
              className="post-link"
            >
              <PostHeader
                title={post.title}
                author={post.author}
                date={post.timestamp}
                voteCount={post.voteScore}
                postId={post.id}
              />
              <PostContent
                content={post.body}
              />
            </Link>
            <PostFooter
              postId={post.id}
              commentCount={this.handleGetCommentCount(post.id)}
            />
          </Card>
        ))}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  }).isRequired,
  comments: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.object,
  }).isRequired,
  category: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { posts, comments } = state;
  return {
    posts,
    comments,
  };
};

export default connect(mapStateToProps)(Posts);

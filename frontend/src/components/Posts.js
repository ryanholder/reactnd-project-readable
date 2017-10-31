import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

class Posts extends Component {
  filterByCategory = (post) => {
    const { category } = this.props;
    if (category !== 'all') {
      return post.category === category;
    }
    return post;
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
          <Link key={post.id} to={`/${post.category}/${post.id}`} className="post-link">
            <Card className="card-container">
              <PostHeader
                title={post.title}
                author={post.author}
                date={post.timestamp}
              />
              <PostContent
                content={post.body}
              />
              <PostFooter
                postId={post.id}
                voteCount={post.voteScore}
                commentCount={this.handleGetCommentCount(post.id)}
              />
            </Card>
          </Link>
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
    items: PropTypes.array,
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

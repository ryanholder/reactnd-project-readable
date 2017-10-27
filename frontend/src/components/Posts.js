import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts.items.filter(this.filterByCategory).map(post => (
          <Card key={post.id} className="card-container">
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
              commentCount={4}
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
  category: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { posts } = state;
  return {
    posts,
  };
};

export default connect(mapStateToProps)(Posts);
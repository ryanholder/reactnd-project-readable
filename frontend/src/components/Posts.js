import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

class Posts extends Component {
  static propTypes = {
    posts: PropTypes.shape({
      isFetching: PropTypes.bool,
      items: PropTypes.array,
    }).isRequired,
    category: PropTypes.string.isRequired,
  }

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
              voteCount={post.voteScore}
              commentCount={4}
            />
          </Card>
        ))}
      </div>
    );
  }
}

export default Posts;

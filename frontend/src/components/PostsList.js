import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import PostsSort from './PostsSort';
import Posts from './Posts';

class PostsList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  render() {
    const { category, posts } = this.props;
    return (
      <div className="grid-container">
        <PostsSort
          orderDesc={posts.orderDesc}
          orderBy={posts.orderBy}
        />
        <Posts
          category={category}
        />
      </div>
    );
  }
}

PostsList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
    orderDesc: PropTypes.bool,
    orderBy: PropTypes.string,
  }).isRequired,
  category: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { posts } = state;
  return {
    posts,
  };
};

export default connect(mapStateToProps)(PostsList);

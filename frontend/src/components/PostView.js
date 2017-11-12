import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostViewNavigation from './PostViewNavigation';
import PostsList from './PostsList';
import { fetchPosts } from '../actions/posts';
import { fetchCategories } from '../actions/categories';

class PostView extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }

  render() {
    const { categories, comments, posts } = this.props;
    return (
      <div className="post-view">
        <PostViewNavigation
          categories={categories}
        />
        <PostsList
          categories={categories}
          comments={comments}
          posts={posts}
        />
      </div>
    );
  }
}

PostView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    selectedCategory: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
  comments: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.object,
    orderDesc: PropTypes.bool,
    orderBy: PropTypes.string,
  }).isRequired,
  posts: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
    orderDesc: PropTypes.bool,
    orderBy: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { categories, comments, posts } = state;
  return {
    categories,
    comments,
    posts,
  };
};

export default connect(mapStateToProps)(PostView);

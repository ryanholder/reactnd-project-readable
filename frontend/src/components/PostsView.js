import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostsViewNavigation from './PostsViewNavigation';
import PostsList from './PostsList';
import { fetchPosts } from '../actions/posts';
import { fetchCategories, setSelectedCategory } from '../actions/categories';

class PostsView extends React.Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchPosts());
    dispatch(fetchCategories()).then((response) => {
      const categoryValid = response.categories.some(category =>
        category.name === match.params.category,
      );
      dispatch(setSelectedCategory(categoryValid ? match.params.category : 'all'));
    });
  }

  render() {
    const { categories, comments, posts } = this.props;
    return (
      <div className="post-view">
        <PostsViewNavigation
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

PostsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
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

export default connect(mapStateToProps)(PostsView);

import React from 'react';
import PropTypes from 'prop-types';
import PostsSort from './PostsSort';
import Posts from './Posts';

const PostsList = (props) => {
  const { categories, comments, posts } = props;
  return (
    <div className="grid-container">
      {posts.isFetching || comments.isFetching || categories.isFetching
        ? <span>Loading...</span>
        :
        <div>
          <PostsSort
            orderDesc={posts.orderDesc}
            orderBy={posts.orderBy}
          />
          <Posts
            categories={categories}
            comments={comments}
            posts={posts}
          />
        </div>
      }
    </div>
  );
};

PostsList.propTypes = {
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

export default PostsList;

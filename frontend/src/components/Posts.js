import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'material-ui/Card';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  handleGetCommentCount = (postId) => {
    const { comments } = this.props;
    if (comments.items[postId] != null) {
      return comments.items[postId].filter(comment => !comment.deleted).length;
    }
    return 0;
  }

  filterByCategory = (post) => {
    const { categories } = this.props;
    if (!post.deleted) {
      if (categories.selectedCategory !== 'all') {
        return post.category === categories.selectedCategory;
      }
      return true;
    }
    return false;
  };

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

export default Posts;

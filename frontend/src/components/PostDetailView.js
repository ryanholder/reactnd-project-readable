import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import PostDetailViewNavigation from './PostDetailViewNavigation';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostComments from './PostComments';
import { fetchPosts } from '../actions/posts';

class PostDetailView extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  filterPostsById = (post) => {
    const { match } = this.props;
    if (!post.deleted && post.id === match.params.id) {
      return true;
    }
    return false;
  };

  render() {
    const { history, posts, comments } = this.props;
    return (
      posts.items.filter(this.filterPostsById).map(post => (
        <div key={post.id} className="post-detail-view">
          <PostDetailViewNavigation
            category={posts.selectedCategory}
            history={history}
            postId={post.id}
          />
          <div className="grid-container">
            <Card className="card-container">
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
            </Card>
            {comments.items[post.id] && <PostComments
              comments={comments.items[post.id]}
              parentId={post.id}
            />}
          </div>
        </div>
      ))
    );
  }
}

PostDetailView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  posts: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
    orderDesc: PropTypes.bool,
    orderBy: PropTypes.string,
  }).isRequired,
  comments: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.objectOf(PropTypes.array),
    orderDesc: PropTypes.bool,
    orderBy: PropTypes.string,
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

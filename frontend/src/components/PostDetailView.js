import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';


class PostDetailView extends Component {
  static propTypes = {
    // dispatch: PropTypes.func.isRequired,
    // posts: PropTypes.shape({
    //   isFetching: PropTypes.bool,
    //   items: PropTypes.array,
    // }).isRequired,
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(fetchPosts());
  }

  render() {
    // const { posts } = this.props;
    return (
      <div>
        Post View
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { posts } = state;
//   return {
//     posts,
//   };
// };

// export default connect(mapStateToProps)(PostsList);
export default PostDetailView;

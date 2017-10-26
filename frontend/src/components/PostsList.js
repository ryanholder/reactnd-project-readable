import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import PostsSort from './PostsSort';
import Posts from './Posts';

class PostsList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.shape({
      isFetching: PropTypes.bool,
      items: PropTypes.array,
    }).isRequired,
    category: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.state = {
      order: 'desc',
      orderBy: 'voteScore',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  handleRequestSort = (event, orderBy) => {
    const { posts } = this.props;
    let order = 'desc';

    if (this.state.orderBy === orderBy && this.state.order === 'desc') {
      order = 'asc';
    }

    order === 'desc'
      ? posts.items.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
      : posts.items.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({
      order,
      orderBy,
    });
  };

  render() {
    const { category, posts } = this.props;
    const { order, orderBy } = this.state;
    return (
      <div className="grid-container">
        <PostsSort
          order={order}
          orderBy={orderBy}
          onRequestSort={this.handleRequestSort}
        />
        <Posts
          category={category}
          posts={posts}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { posts } = state;
  return {
    posts,
  };
};

export default connect(mapStateToProps)(PostsList);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import ThumbsUpDown from 'material-ui-icons/ThumbsUpDown';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Timestamp from 'react-timestamp';
import { fetchPosts } from '../actions/posts';

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

    this.state = {
      sortByTimeStamp: false,
      sortByVoteScore: true,
      sortByTimeStampAsc: true,
      sortByVoteScoreAsc: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  filterByCategory = (post) => {
    const { category } = this.props;
    if (category !== 'all') {
      return post.category === category;
    }

    return post;
  }

  sortPostsBy = (value) => {
    const { posts } = this.props;
    const { sortByTimeStamp, sortByVoteScore, sortByTimeStampAsc, sortByVoteScoreAsc } = this.state;

    let sortByState = {};
    let order = 'asc';

    switch (value) {
      case 'voteScore':
        order = (sortByVoteScoreAsc ? 'asc' : 'desc');
        sortByState = {
          sortByTimeStamp: false,
          sortByVoteScore: true,
          sortByVoteScoreAsc: !sortByVoteScoreAsc,
        };
        break;
      case 'timestamp':
        order = (sortByTimeStampAsc ? 'asc' : 'desc');
        sortByState = {
          sortByTimeStamp: true,
          sortByVoteScore: false,
          sortByTimeStampAsc: !sortByTimeStampAsc,
        };
        break;
      default:
        order = 'asc';
        sortByState = {
          sortByTimeStamp: false,
          sortByVoteScore: true,
          sortByTimeStampAsc: true,
          sortByVoteScoreAsc: true,
        };
    }

    posts.items = orderBy(posts.items, value, order);

    this.setState(sortByState);
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="grid-container">
        <div>
          Sort by:
          <button onClick={() => { this.sortPostsBy('voteScore'); }}>Vote</button>

          <button onClick={() => { this.sortPostsBy('timestamp'); }}>Date</button>
        </div>
        {posts.items.filter(this.filterByCategory).map(post => (
          <Card key={post.id} className="card-container">
            <CardHeader
              title={
                <Typography type="title" gutterBottom>
                  {post.title}
                </Typography>
              }
              subheader={
                <span>
                  Written by: {post.author} on <Timestamp time={post.timestamp / 1000} format="date" />
                </span>
              }
            />
            <CardContent>
              <Typography component="p">
                {post.body}
              </Typography>
            </CardContent>
            <CardActions disableActionSpacing>
              <IconButton
                aria-label="Comments"
                disabled
              >
                <Badge badgeContent={4} color="primary">
                  <CommentIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="Vote Score"
                disabled
              >
                <Badge badgeContent={post.voteScore} color="accent">
                  <ThumbsUpDown />
                </Badge>
              </IconButton>
              <div className="flex-grow" />
              <IconButton aria-label="Vote Up">
                <ThumbUpIcon />
              </IconButton>
              <IconButton aria-label="Vote Down">
                <ThumbDownIcon />
              </IconButton>
              <IconButton aria-label="More">
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
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

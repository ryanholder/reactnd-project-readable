import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

export default Posts;

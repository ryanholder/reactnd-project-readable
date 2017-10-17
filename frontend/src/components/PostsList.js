import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import CommentIcon from 'material-ui-icons/Comment';
import Person from 'material-ui-icons/Person';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import red from 'material-ui/colors/red';
import Chip from 'material-ui/Chip';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Badge from 'material-ui/Badge';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import ThumbsUpDown from 'material-ui-icons/ThumbsUpDown';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { fetchPosts } from '../actions/posts';


class PostsList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.shape({
      isFetching: PropTypes.bool,
      items: PropTypes.array,
    }).isRequired,
    selectedCategory: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props;
    dispatch(fetchPosts(selectedCategory));
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="grid-container">
        {posts.items.map(post => (
          <Card key={post.id} className="card-container">
            <CardHeader
              title={
                <Typography type="title" gutterBottom>
                  {post.title}
                </Typography>
              }
              subheader={
                <span>
                  Written by: {post.author}
                </span>
              }
            />
            <CardContent>
              <Typography component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
                <Badge badgeContent={10} color="accent">
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

const mapStateToProps = (state) => {
  const { posts, selectedCategory } = state;
  return {
    posts,
    selectedCategory,
  };
};

export default connect(mapStateToProps)(PostsList);

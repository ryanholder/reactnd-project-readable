import React from 'react';
import { CardActions } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import ThumbsUpDown from 'material-ui-icons/ThumbsUpDown';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const PostFooter = props => (
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
      <Badge badgeContent={props.voteCount} color="accent">
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
);

export default PostFooter;

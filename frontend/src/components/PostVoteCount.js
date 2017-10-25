import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ThumbsUpDown from 'material-ui-icons/ThumbsUpDown';

const PostVoteCount = props => (
  <div>
    <IconButton
      aria-label="Vote Score"
      disabled
    >
      <Badge badgeContent={props.voteCount} color="accent">
        <ThumbsUpDown />
      </Badge>
    </IconButton>
  </div>
);

export default PostVoteCount;

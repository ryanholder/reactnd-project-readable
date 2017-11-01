import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ThumbsUpDown from 'material-ui-icons/ThumbsUpDown';

const PostVoteCount = props => (
  <div className="post-vote-count">
    <IconButton
      aria-label="Vote Score"
      disabled
    >
      <Badge badgeContent={props.voteCount} color="accent" className="count-badge">
        <ThumbsUpDown />
      </Badge>
    </IconButton>
  </div>
);

export default PostVoteCount;

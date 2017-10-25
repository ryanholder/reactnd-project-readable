import React from 'react';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';

const PostVoteUpDown = props => (
  <div>
    <IconButton aria-label="Vote Up">
      <ThumbUpIcon />
    </IconButton>
    <IconButton aria-label="Vote Down">
      <ThumbDownIcon />
    </IconButton>
  </div>
);

export default PostVoteUpDown;

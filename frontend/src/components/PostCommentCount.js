import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';

const PostCommentCount = props => (
  <div>
    <IconButton
      aria-label="Comments"
      disabled
    >
      <Badge badgeContent={4} color="primary" className="count-badge">
        <CommentIcon />
      </Badge>
    </IconButton>
  </div>
);

export default PostCommentCount;

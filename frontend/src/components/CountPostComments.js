import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';

const CountPostComments = props => (
  <div className="post-comment-count">
    <IconButton
      aria-label="Comments"
      disabled
    >
      <Badge badgeContent={props.commentCount} color="primary" className="count-badge">
        <CommentIcon />
      </Badge>
    </IconButton>
  </div>
);

CountPostComments.propTypes = {
  commentCount: PropTypes.number.isRequired,
};

export default CountPostComments;

import React from 'react';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import PostCommentCount from './PostCommentCount';

const PostFooter = props => (
  <CardActions disableActionSpacing>
    <PostCommentCount
      commentCount={props.commentCount}
    />
    <div className="flex-grow" />
    <IconButton aria-label="More">
      <MoreVertIcon />
    </IconButton>

  </CardActions>
);

PostFooter.propTypes = {
  commentCount: PropTypes.number.isRequired,
};

export default PostFooter;

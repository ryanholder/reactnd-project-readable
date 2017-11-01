import React from 'react';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import PostCommentCount from './PostCommentCount';
import PostVoteCount from './PostVoteCount';
import VoteUpDown from './VoteUpDown';

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
  postId: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  voteCount: PropTypes.number.isRequired,
};

export default PostFooter;

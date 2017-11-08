import React from 'react';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import CountPostComments from './CountPostComments';
import EditDeletePost from './EditDeletePost';

const PostFooter = props => (
  <CardActions disableActionSpacing>
    <CountPostComments
      commentCount={props.commentCount}
    />
    <div className="flex-grow" />
    <EditDeletePost
      postId={props.postId}
    />
  </CardActions>
);

PostFooter.propTypes = {
  commentCount: PropTypes.number.isRequired,
  postId: PropTypes.string.isRequired,
};

export default PostFooter;

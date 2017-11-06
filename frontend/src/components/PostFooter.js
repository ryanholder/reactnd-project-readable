import React from 'react';
import PropTypes from 'prop-types';
import { CardActions } from 'material-ui/Card';
import CountPostComments from './CountPostComments';
import MoreMenuButton from './MoreMenuButton';

const PostFooter = props => (
  <CardActions disableActionSpacing>
    <CountPostComments
      commentCount={props.commentCount}
    />
    <div className="flex-grow" />
    <MoreMenuButton />
  </CardActions>
);

PostFooter.propTypes = {
  commentCount: PropTypes.number.isRequired,
};

export default PostFooter;

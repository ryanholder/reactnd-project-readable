import React from 'react';
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
    <PostVoteCount
      voteCount={props.voteCount}
    />
    <div className="flex-grow" />
    <VoteUpDown
      id={props.id}
      type={'post'}
    />
    <IconButton aria-label="More">
      <MoreVertIcon />
    </IconButton>
  </CardActions>
);

export default PostFooter;

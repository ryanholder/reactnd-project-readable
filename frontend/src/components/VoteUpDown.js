import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import { votePostUp, votePostDown, voteCommentUp, voteCommentDown } from '../actions/votes';
import { orderPosts } from '../actions/posts';
import { orderComments } from '../actions/comments';
import PostVoteCount from './PostVoteCount';

const VoteUpDown = (props) => {
  const { dispatch } = props;

  const handleVoteUp = (
    e,
    voteType = props.voteType,
    id = props.id,
    parentId = props.parentId,
  ) => {
    e.preventDefault();

    switch (voteType) {
      case 'post':
        dispatch(votePostUp(id))
          .then(() => dispatch(
            orderPosts(props.posts.orderDesc, props.posts.orderBy)),
          );
        break;
      case 'comment':
        dispatch(voteCommentUp(id))
          .then(() => dispatch(
            orderComments(props.comments.orderDesc, props.comments.orderBy, parentId)),
          );
        break;
      default:
        break;
    }
  };

  const handleVoteDown = (
    e,
    voteType = props.voteType,
    id = props.id,
    parentId = props.parentId,
  ) => {
    e.preventDefault();

    switch (voteType) {
      case 'post':
        dispatch(votePostDown(id))
          .then(() => dispatch(orderPosts(props.posts.orderDesc, props.posts.orderBy)));
        break;
      case 'comment':
        dispatch(voteCommentDown(id))
          .then(() => dispatch(
            orderComments(props.comments.orderDesc, props.comments.orderBy, parentId)),
          );
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <IconButton
        color={props.color}
        aria-label="Vote Up"
        onClick={handleVoteUp}
      >
        <ThumbUpIcon />
      </IconButton>
      <IconButton
        color={props.color}
        aria-label="Vote Down"
        onClick={handleVoteDown}
      >
        <ThumbDownIcon />
      </IconButton>
      <PostVoteCount
        voteCount={props.voteCount}
      />
    </div>
  );
};

VoteUpDown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  voteType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  color: PropTypes.string,
  voteCount: PropTypes.number.isRequired,
};

VoteUpDown.defaultProps = {
  color: 'default',
  parentId: '',
};

function mapStateToProps(state) {
  const { posts, comments } = state;
  return {
    posts,
    comments,
  };
}

export default connect(mapStateToProps)(VoteUpDown);

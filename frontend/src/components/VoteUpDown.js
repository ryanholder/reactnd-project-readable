import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import { votePostUp, votePostDown } from '../actions/votes';
import { orderPosts } from '../actions/posts';
import PostVoteCount from './PostVoteCount';

const VoteUpDown = (props) => {
  const { dispatch } = props;

  const handleVoteUp = (e, voteType = props.voteType, postId = props.postId) => {
    e.preventDefault();

    switch (voteType) {
      case 'post':
        dispatch(votePostUp(postId))
          .then(() => dispatch(orderPosts(props.posts.orderDesc, props.posts.orderBy)));
        break;
      case 'comment':
        break;
      default:
        break;
    }
  };

  const handleVoteDown = (e, voteType = props.voteType, postId = props.postId) => {
    e.preventDefault();

    switch (voteType) {
      case 'post':
        dispatch(votePostDown(postId))
          .then(() => dispatch(orderPosts(props.posts.orderDesc, props.posts.orderBy)));
        break;
      case 'comment':
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
  postId: PropTypes.string.isRequired,
  color: PropTypes.string,
  voteCount: PropTypes.number.isRequired,
};

VoteUpDown.defaultProps = {
  color: 'default',
};

function mapStateToProps(state) {
  const { posts, comments } = state;
  return {
    posts,
    comments,
  };
}

export default connect(mapStateToProps)(VoteUpDown);

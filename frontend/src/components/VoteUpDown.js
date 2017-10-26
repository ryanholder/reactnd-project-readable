import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';

import { votePost, votePostUp, votePostDown } from '../actions/votes';

// app.post('/posts/:id', bodyParser.json(), (req, res) => {
//     const { option } = req.body
//     const id = req.params.id
//     posts.vote(req.token, id, option)
//       .then(
//           (data) => res.send(data),
//           (error) => {
//               console.error(error)
//               res.status(500).send({
//                   error: 'There was an error.'
//               })
//           }
//       )
// })

const VoteUpDown = (props) => {
  const { dispatch } = props;

  const handleVoteUp = (e, type = props.type, id = props.id) => {
    e.preventDefault();

    switch (type) {
      case 'post':
        dispatch(votePostUp(id));
        break;
      case 'comment':
        break;
      default:
        break;
    }
  };

  const handleVoteDown = (e, type = props.type, id = props.id) => {
    e.preventDefault();

    switch (type) {
      case 'post':
        dispatch(votePostDown(id));
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
        aria-label="Vote Up"
        onClick={handleVoteUp}
      >
        <ThumbUpIcon />
      </IconButton>
      <IconButton
        aria-label="Vote Down"
        onClick={handleVoteDown}
      >
        <ThumbDownIcon />
      </IconButton>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
  };
}

export default connect(mapStateToProps)(VoteUpDown);

import React from 'react';
import { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import PersonIcon from 'material-ui-icons/Person';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import PostCommentCount from './PostCommentCount';
import PostVoteCount from './PostVoteCount';
import VoteUpDown from './VoteUpDown';
import Timestamp from 'react-timestamp';
import Typography from 'material-ui/Typography';

const PostHeader = props => (
  <div className="post-header">
    <CardHeader
      className="card-header"
      avatar={
        <div>
          <VoteUpDown
            postId={props.postId}
            voteType={'post'}
            voteCount={props.voteCount}
          />
        </div>
      }
      title={
        <div>
          <Typography type="title" gutterBottom>
            {props.title}
          </Typography>
        </div>
      }
      subheader={
        <div className="post-detail-view-counts">
          <Chip
            avatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            label={props.author}
            className="post-chip"
          />
          <Chip
            avatar={
              <Avatar>
                <AccessTimeIcon />
              </Avatar>
            }
            label={<Timestamp time={props.date / 1000} format="date" />}
            className="post-chip"
          />
        </div>
      }
    />
  </div>
);

export default PostHeader;

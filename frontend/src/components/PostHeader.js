import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import { CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import PersonIcon from 'material-ui-icons/Person';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import VoteUpDown from './VoteUpDown';

const PostHeader = props => (
  <div className="post-header">
    <CardHeader
      className="card-header"
      avatar={
        <div>
          <VoteUpDown
            id={props.postId}
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

PostHeader.propTypes = {
  postId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  voteCount: PropTypes.number.isRequired,
};

export default PostHeader;

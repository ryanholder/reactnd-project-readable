import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from 'react-timestamp';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Toolbar from 'material-ui/Toolbar';
import { ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import PersonIcon from 'material-ui-icons/Person';
import CountPostComments from './CountPostComments';
import VoteUpDown from './VoteUpDown';
import AddComment from './AddComment';
import EditDeleteComment from './EditDeleteComment';

const PostComments = (props) => {
  const { comments, parentId } = props;

  const handleGetCommentCount = () =>
    comments.filter(comment => !comment.deleted).length;

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar className="post-detail comments-toolbar">
          {comments && <CountPostComments
            commentCount={handleGetCommentCount()}
          />}
          <div className="flex-grow" />
          <AddComment
            parentId={parentId}
          />
        </Toolbar>
      </AppBar>

      {comments.map(comment => (
        !comment.deleted ?
          <Card key={comment.id}>
            <CardHeader
              className="card-header"
              avatar={
                <div>
                  <VoteUpDown
                    id={comment.id}
                    voteType={'comment'}
                    parentId={comment.parentId}
                    voteCount={comment.voteScore}
                  />
                  <EditDeleteComment
                    postId={comment.parentId}
                    commentId={comment.id}
                  />
                </div>
              }
              title={
                <div className="comment-detail-view-counts">
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                  <ListItemText
                    primary={comment.author}
                    secondary={<Timestamp time={comment.timestamp / 1000} format="date" />}
                  />
                </div>
              }
            />
            <CardContent>
              <Typography component="p">
                {comment.body}
              </Typography>
            </CardContent>
            <Divider light />
          </Card>
          : null
      ))}
    </div>
  );
};

PostComments.propTypes = {
  parentId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostComments;

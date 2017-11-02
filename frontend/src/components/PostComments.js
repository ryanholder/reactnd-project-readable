import React from 'react';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { ListItemText } from 'material-ui/List';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import PersonIcon from 'material-ui-icons/Person';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import CountPostComments from './CountPostComments';
import VoteUpDown from './VoteUpDown';

const PostComments = (props) => {
  const { comments, postId } = props;

  const handleGetCommentCount = (postId) => {
    if (comments.items[postId]) {
      return comments.items[postId].length;
    }

    return 0;
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar className="post-detail comments-toolbar">
          <CountPostComments
            commentCount={handleGetCommentCount(postId)}
          />
          <div className="appTitle" />
          <Button raised color="accent">
            Add Comment
          </Button>
        </Toolbar>
      </AppBar>

      <Card>
        {comments.items[postId].map(comment => (
          <div key={comment.id}>
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
                  <IconButton aria-label="More">
                    <MoreVertIcon />
                  </IconButton>
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
            {/* <CardActions disableActionSpacing>
              <div className="flex-grow" />
              <IconButton aria-label="More">
                <MoreVertIcon />
              </IconButton>

            </CardActions> */}
            <Divider light />
          </div>
        ))}
      </Card>
    </div>
  );
};

function mapStateToProps(state) {
  const { comments } = state;
  return {
    comments,
  };
}

export default connect(mapStateToProps)(PostComments);

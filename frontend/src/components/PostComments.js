import React from 'react';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import PersonIcon from 'material-ui-icons/Person';
import AccessTimeIcon from 'material-ui-icons/AccessTime';
import PostCommentCount from './PostCommentCount';
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
          <PostCommentCount
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
                </div>
              }
              title={
                <div className="comment-detail-view-counts">
                  <Chip
                    avatar={
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    }
                    label={comment.author}
                    className="comment-chip"
                  />
                </div>
              }
            />
            <CardContent>
              <Typography component="p">
                {comment.body}
              </Typography>
            </CardContent>
            <CardActions disableActionSpacing>
              <div className="flex-grow" />
              <IconButton aria-label="More">
                <MoreVertIcon />
              </IconButton>

            </CardActions>
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

import React from 'react';
import { connect } from 'react-redux';
import Card, { CardContent } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import PostCommentCount from './PostCommentCount';

const PostComments = (props) => {
  const handleGetCommentCount = (postId) => {
    console.log(postId);
    const { comments } = props;
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
            commentCount={handleGetCommentCount(props.postId)}
          />
          <div className="appTitle" />
          <Button raised color="accent">
            Add Comment
          </Button>
        </Toolbar>
      </AppBar>

      <Card>
        <CardContent>
          <Typography component="p">
            Comments here...
          </Typography>
        </CardContent>
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

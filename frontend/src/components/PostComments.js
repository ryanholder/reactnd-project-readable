import React from 'react';
import { connect } from 'react-redux';
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
  const { comments, postId } = props;

  const handleGetCommentCount = () =>
    comments.items[postId].filter(comment => !comment.deleted).length;

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar className="post-detail comments-toolbar">
          <CountPostComments
            commentCount={handleGetCommentCount()}
          />
          <div className="appTitle" />
          <AddComment
            parentId={props.postId}
          />
        </Toolbar>
      </AppBar>

      <Card>
        {comments.items[postId].map(comment => (
          !comment.deleted ?
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
                    <EditDeleteComment
                      postId={postId}
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
            </div>
            : null
        ))}
      </Card>
    </div>
  );
};

PostComments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.shape({
    items: PropTypes.object,
  }).isRequired,
};

function mapStateToProps(state) {
  const { comments } = state;
  return {
    comments,
  };
}

export default connect(mapStateToProps)(PostComments);

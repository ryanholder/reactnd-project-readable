import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Slide from 'material-ui/transitions/Slide';
import { editComment } from '../actions/comments';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.currentComment;
  }

  handleSubmit = (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(editComment(this.state));
    this.props.handleEditClose();
  };

  handleChange = name => (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes, isOpen, handleEditClose } = this.props;
    const { author, body } = this.state;
    return (
      <Dialog
        fullScreen
        open={isOpen}
        onRequestClose={handleEditClose}
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="contrast" onClick={handleEditClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Edit Comment
            </Typography>
            <Button color="contrast" type="submit" form="editComment">
              update
            </Button>
          </Toolbar>
        </AppBar>
        <form id="editComment" className="grid-container" onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <TextField
                value={author}
                onChange={this.handleChange('author')}
                label="Author"
                placeholder="Name"
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={body}
                onChange={this.handleChange('body')}
                label="Content"
                margin="normal"
                fullWidth
                multiline
                rows="10"
              />
            </Grid>
          </Grid>
        </form>
      </Dialog>
    );
  }
}

EditCommentForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  currentComment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    parentDeleted: PropTypes.bool.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleEditClose: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { comments } = state;
  const { commentId, postId } = ownProps;
  return {
    currentComment: comments.items[postId].filter(comment => (comment.id === commentId))[0],
  };
}

export default connect(mapStateToProps)(withStyles(styles)(EditCommentForm));

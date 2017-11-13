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
import { addNewComment } from '../actions/comments';

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

class AddCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      author: '',
      parentId: props.parentId,
    };
  }

  handleSubmit = (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(addNewComment(this.state));
    this.setState({
      body: '',
      author: '',
    });
    this.props.handleRequestClose();
  };

  handleChange = name => (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes, handleRequestClose, isOpen } = this.props;
    const { body, author } = this.state;
    return (
      <Dialog
        fullScreen
        open={isOpen}
        onRequestClose={handleRequestClose}
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="contrast" onClick={handleRequestClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Add Comment
            </Typography>
            <Button color="contrast" type="submit" form="addComment">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form id="addComment" className="grid-container" onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
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

AddCommentForm.propTypes = {
  parentId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default connect()(withStyles(styles)(AddCommentForm));

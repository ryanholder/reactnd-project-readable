import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Grid from 'material-ui/Grid';
import Slide from 'material-ui/transitions/Slide';
import { editPost } from '../actions/posts';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

const categories = [
  {
    value: 'react',
    label: 'React',
  },
  {
    value: 'redux',
    label: 'Redux',
  },
  {
    value: 'udacity',
    label: 'Udacity',
  },
];

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.currentPost;
  }

  handleSubmit = (event) => {
    const { dispatch, match, history } = this.props;
    event.preventDefault();
    dispatch(editPost(this.state))
      .then((response) => {
        if ('id' in match.params) {
          if (response.type === 'EDIT_POST_SUCCESS' && match.params.category !== response.post.category) {
            history.replace(`/${response.post.category}/${response.post.id}`);
          }
        }
        this.props.handleEditClose();
      });
  };

  handleChange = name => (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    event.preventDefault();
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes, isOpen, handleEditClose } = this.props;
    const { title, body, author, category } = this.state;
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
              Edit Post
            </Typography>
            <Button color="contrast" type="submit" form="editPost">
              update
            </Button>
          </Toolbar>
        </AppBar>
        <form id="editPost" className="grid-container" onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                value={title}
                onChange={this.handleChange('title')}
                label="Title"
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
            <Grid item xs={6}>
              <TextField
                value={category}
                onChange={this.handleChange('category')}
                select
                label="Select Category"
                className="select-categories-main"
                SelectProps={{
                  MenuProps: {
                    className: 'select-categories',
                  },
                }}
                margin="normal"
                fullWidth
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    );
  }
}

EditPostForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  currentPost: PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleEditClose: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

function mapStateToProps(state, ownProps) {
  const { posts } = state;
  const { postId } = ownProps;
  return {
    currentPost: posts.items.filter(post => (post.id === postId))[0],
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(EditPostForm)));

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
import MenuItem from 'material-ui/Menu/MenuItem';
import Grid from 'material-ui/Grid';
import Slide from 'material-ui/transitions/Slide';
import { addNewPost } from '../actions/posts';

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

class AddPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
      category: '',
    };
  }

  handleSubmit = (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(addNewPost(this.state));
    this.setState({
      title: '',
      body: '',
      author: '',
      category: '',
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
    const { classes, isOpen, handleRequestClose } = this.props;
    const { title, body, author, category } = this.state;
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
              Add Post
            </Typography>
            <Button color="contrast" type="submit" form="addPost">
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form id="addPost" className="grid-container" onSubmit={this.handleSubmit}>
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

AddPostForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
};

export default connect()(withStyles(styles)(AddPostForm));

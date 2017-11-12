import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import EditPostForm from './EditPostForm';
import { deletePost } from '../actions/posts';

class EditDeletePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      menuOpen: false,
      editOpen: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ menuOpen: true, anchorEl: event.currentTarget });
  };

  handleEditPostClick = (event) => {
    event.preventDefault();
    this.setState({ editOpen: true });
    this.setState({ menuOpen: false });
  };

  handleDeletePostClick = (event, postId) => {
    const { dispatch, history, match } = this.props;
    event.preventDefault();
    dispatch(deletePost(postId))
      .then((response) => {
        if (response.type === 'DELETE_POST_SUCCESS' && match.path === '/:category/:id') {
          history.replace('/');
        }
        this.handleMenuClose();
      });
  };

  handleMenuClose = () => {
    this.setState({ menuOpen: false });
  };

  handleEditClose = () => {
    this.setState({ editOpen: false });
  };

  render() {
    const { color, postId } = this.props;
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={this.state.menuOpen ? 'simple-menu' : null}
          aria-haspopup="true"
          color={color}
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.menuOpen}
          onRequestClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleEditPostClick}>Edit</MenuItem>
          <MenuItem onClick={event => this.handleDeletePostClick(event, postId)}>Delete</MenuItem>
        </Menu>
        <EditPostForm
          handleEditClose={this.handleEditClose}
          isOpen={this.state.editOpen}
          postId={postId}
        />
      </div>
    );
  }
}

EditDeletePost.defaultProps = {
  color: 'default',
};

EditDeletePost.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  color: PropTypes.string,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default withRouter(connect()(EditDeletePost));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import EditCommentForm from './EditCommentForm';
import { deleteComment } from '../actions/comments';

class EditDeleteComment extends React.Component {
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

  handleEditCommentClick = (event) => {
    event.preventDefault();
    this.setState({ editOpen: true });
    this.setState({ menuOpen: false });
  };

  handleDeleteCommentClick = (event, commentId) => {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(deleteComment(commentId));
    this.handleMenuClose();
  };

  handleMenuClose = () => {
    this.setState({ menuOpen: false });
  };

  handleEditClose = () => {
    this.setState({ editOpen: false });
  };

  render() {
    const { postId, commentId, color } = this.props;
    const { menuOpen, editOpen, anchorEl } = this.state;
    return (
      <div className="edit-delete-comment">
        <IconButton
          aria-label="More"
          aria-owns={menuOpen ? 'simple-menu' : null}
          aria-haspopup="true"
          color={color}
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onRequestClose={this.handleMenuClose}
        >
          <MenuItem
            onClick={this.handleEditCommentClick}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={event => this.handleDeleteCommentClick(event, commentId)}
          >
            Delete
          </MenuItem>
        </Menu>
        <EditCommentForm
          handleEditClose={this.handleEditClose}
          isOpen={editOpen}
          postId={postId}
          commentId={commentId}
        />
      </div>
    );
  }
}

EditDeleteComment.propTypes = {
  dispatch: PropTypes.func.isRequired,
  commentId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  color: PropTypes.string,
};

EditDeleteComment.defaultProps = {
  color: 'default',
};

export default withRouter(connect()(EditDeleteComment));

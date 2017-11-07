import React from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import EditPostForm from './EditPostForm';

class MoreMenuButton extends React.Component {
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

  handleMenuClose = (event) => {
    event.preventDefault();
    this.setState({ menuOpen: false });
  };

  handleEditClose = () => {
    this.setState({ editOpen: false });
  };

  render() {
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={this.state.menuOpen ? 'simple-menu' : null}
          aria-haspopup="true"
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
          <MenuItem onClick={this.handleRequestClose}>Delete</MenuItem>
        </Menu>
        <EditPostForm
          handleEditClose={this.handleEditClose}
          isOpen={this.state.editOpen}
          postId={this.props.postId}
        />
      </div>
    );
  }
}

MoreMenuButton.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default MoreMenuButton;

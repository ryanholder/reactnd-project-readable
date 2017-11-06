import React from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';

class MoreMenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = (event) => {
    event.preventDefault();
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>Edit</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Delete</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MoreMenuButton;

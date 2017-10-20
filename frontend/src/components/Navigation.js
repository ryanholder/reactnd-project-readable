import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import { fetchCategories } from '../actions/categories';

class Navigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.shape({
      selectedCategory: PropTypes.string,
      isFetching: PropTypes.bool,
      items: PropTypes.array,
    }).isRequired,
    category: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleMenuItemClick = (event) => {
    this.setState({ open: false });
  };

  render() {
    const { category, categories } = this.props;
    return (
      <AppBar position="static" color="primary">
        <Toolbar className="nav-toolbar">
          <IconButton
            aria-owns={this.state.open ? 'simple-menu' : null}
            color="contrast"
            aria-label="Menu"
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="category-title" type="title" color="inherit">
            {category}
          </Typography>
          <Menu
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            {[{ name: category, path: '' }].concat(categories.items).map(item => (
              <MenuItem
                key={item.name}
                selected={category === item.name}
              >
                <Link
                  className="category-link"
                  to={item.path}
                  onClick={event => this.handleMenuItemClick(event)}
                >
                  {item.name}
                </Link>
              </MenuItem>
            ))}
          </Menu>
          <div className="appTitle" />
          <Button raised color="accent">
            Add Post
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  const { categories } = state;
  return {
    categories,
  };
};

export default connect(mapStateToProps)(Navigation);

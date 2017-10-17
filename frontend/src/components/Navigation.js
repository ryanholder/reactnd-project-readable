import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import { fetchCategories, selectCategory } from '../actions/categories';

class Navigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.shape({
      isFetching: PropTypes.bool,
      items: PropTypes.array,
    }).isRequired,
    selectedCategory: PropTypes.string.isRequired,
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

  handleMenuItemClick = (event, category) => {
    const { dispatch } = this.props;
    this.setState({ open: false });
    dispatch(selectCategory(category));
  };

  render() {
    const { categories, selectedCategory } = this.props;
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
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
            {selectedCategory}
          </Typography>
          <Menu
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            {[{ name: 'all', path: 'all' }].concat(categories.items).map(category => (
              <MenuItem
                key={category.name}
                selected={this.props.selectedCategory === category.name}
                onClick={event => this.handleMenuItemClick(event, category.name)}
              >
                <Link className="category-link" to={(category.path === 'all' ? '/' : `/${category.path}`)}>{category.name}</Link>
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
  const { selectedCategory, categories } = state;
  return {
    selectedCategory,
    categories,
  };
};

export default connect(mapStateToProps)(Navigation);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import { setSelectedCategory } from '../actions/categories';

class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  handleClick = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleMenuItemClick = (category) => {
    const { dispatch } = this.props;
    dispatch(setSelectedCategory(category));
    this.setState({ open: false });
  };

  render() {
    const { categories } = this.props;
    return (
      <div className="category-select">
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
          {categories.selectedCategory}
        </Typography>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {[{ name: 'all', path: '' }].concat(categories.items).map(item => (
            <MenuItem
              key={item.name}
              selected={categories.selectedCategory === item.name}
            >
              <Link
                className="category-link"
                to={item.path}
                onClick={category => this.handleMenuItemClick(item.name)}
              >
                {item.name}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

CategorySelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    selectedCategory: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
};

export default connect()(CategorySelect);

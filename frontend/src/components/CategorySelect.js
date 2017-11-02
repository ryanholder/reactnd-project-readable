import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import { fetchCategories } from '../actions/categories';

class CategorySelect extends Component {
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
          {category}
        </Typography>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {[{ name: 'all', path: '' }].concat(categories.items).map(item => (
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
      </div>
    );
  }
}

CategorySelect.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    selectedCategory: PropTypes.string,
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  }).isRequired,
  category: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { categories } = state;
  return {
    categories,
  };
};

export default connect(mapStateToProps)(CategorySelect);

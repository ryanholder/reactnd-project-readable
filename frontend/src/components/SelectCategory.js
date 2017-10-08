
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { selectCategory } from '../actions/categories';

class SelectCategory extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  // handleClickListItem = event => {
  //   this.setState({ open: true, anchorEl: event.currentTarget });
  // };

  // handleMenuItemClick = (event, index) => {
  //   this.setState({ selectedCategory: index, open: false });
  // };
  //
  // handleRequestClose = () => {
  //   this.setState({ open: false });
  // };


  render() {
    const { selectedCategory } = this.props;

    return (
      <div>
        <Typography
          type="subheading"
          className={'appTitle'}
        >
          Reading:
          <Button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="View posts from"
            // onClick={this.handleClickListItem}
          >
            {selectedCategory}
            <ExpandMoreIcon />
          </Button>
        </Typography>
        {/* <Menu
          id="simple-menu"
          // anchorEl={this.state.anchorEl}
          // open={this.state.open}
          // onRequestClose={this.handleRequestClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              // selected={index === props.selectedCategory}
              // onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu> */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedCategory: state.selectedCategory,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(selectCategory(ownProps.category));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectCategory);

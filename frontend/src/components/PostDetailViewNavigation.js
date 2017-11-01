import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
// import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { fetchCategories } from '../actions/categories';

class PostDetailViewNavigation extends Component {
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

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleMenuItemClick = (event) => {
    this.setState({ open: false });
  };

  render() {
    // const { category, categories, postId } = this.props;
    return (
      <AppBar position="static" color="primary">
        <Toolbar className="post-detail nav-toolbar">
          <IconButton
            color="contrast"
            aria-label="Close"
            onClick={this.handleGoBack}
          >
            <CloseIcon />
          </IconButton>
          <div className="appTitle" />
          <IconButton
            color="contrast"
            aria-label="More"
          >
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

PostDetailViewNavigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    selectedCategory: PropTypes.string,
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  }).isRequired,
  category: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { categories } = state;
  return {
    categories,
  };
};

export default connect(mapStateToProps)(PostDetailViewNavigation);

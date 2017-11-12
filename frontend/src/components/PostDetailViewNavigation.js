import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import EditDeletePost from './EditDeletePost';

class PostDetailViewNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  handleGoBack = (event) => {
    const { history } = this.props;
    event.stopPropagation();
    history.goBack();
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleMenuItemClick = (event) => {
    this.setState({ open: false });
  };

  render() {
    const { postId } = this.props;
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
          <div className="flex-grow" />
          <EditDeletePost
            postId={postId}
            color="contrast"
          />
        </Toolbar>
      </AppBar>
    );
  }
}

PostDetailViewNavigation.defaultProps = {
  postId: '',
};

PostDetailViewNavigation.propTypes = {
  postId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default connect()(PostDetailViewNavigation);

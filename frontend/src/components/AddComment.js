import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AddCommentForm from './AddCommentForm';

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { parentId } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          color="primary"
        >
          Add Comment
        </Button>
        <AddCommentForm
          handleRequestClose={this.handleRequestClose}
          isOpen={open}
          parentId={parentId}
        />
      </div>
    );
  }
}

AddComment.propTypes = {
  parentId: PropTypes.string.isRequired,
};

export default AddComment;

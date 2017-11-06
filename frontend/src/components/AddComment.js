import React from 'react';
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
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          raised
          color="accent"
        >
          Add Comment
        </Button>
        <AddCommentForm
          handleRequestClose={this.handleRequestClose}
          isOpen={this.state.open}
          parentId={this.props.parentId}
        />
      </div>
    );
  }
}

export default AddComment;

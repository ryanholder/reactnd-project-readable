import React from 'react';
import Button from 'material-ui/Button';
import AddPostForm from './AddPostForm';

class AddPost extends React.Component {
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
          color="contrast"
        >
          Add Post
        </Button>
        <AddPostForm
          handleRequestClose={this.handleRequestClose}
          isOpen={this.state.open}
        />
      </div>
    );
  }
}

export default AddPost;

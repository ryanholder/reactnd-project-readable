import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { fetchPosts } from '../actions/posts';
// import SelectCategory from '../components/SelectCategory';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.shape({
      isFetching: PropTypes.bool,
      items: PropTypes.array,
    }).isRequired,
    selectedCategory: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch(fetchPosts());
  }

  render() {
    // const { selectedCategory, isFetching, lastUpdated } = this.props;
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Button raised color="accent">
              Add Post
            </Button>
          </Toolbar>
          <div>
            Hello World
          </div>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedCategory, posts } = state;
  return {
    selectedCategory,
    posts,
  };
};

export default connect(mapStateToProps)(App);

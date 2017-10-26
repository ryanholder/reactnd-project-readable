import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Toolbar from 'material-ui/Toolbar';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { orderPosts } from '../actions/posts';

class PostsSort extends Component {
  static propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange = orderBy => (event) => {
  //   this.props.onRequestSort(event, orderBy);
  // };

  render() {
    const { order, orderBy, dispatch } = this.props;

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'voteScore'}
                  direction={order}
                  onClick={() => { dispatch(orderPosts('voteScore')); }}
                  // onClick={dispatch(orderPosts('voteScore'))}
                >
                  Votes
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'timestamp'}
                  direction={order}
                  onClick={() => { dispatch(orderPosts('timestamp')); }}
                >
                  Date
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        {/* <Toolbar>
          <div>
            <Typography type="title">Posts</Typography>
          </div>
          <div />
          <div>
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar> */}
        {/* Sort by:
        <button onClick={() => { this.sortPostsBy('voteScore'); }}>Vote</button>
        <button onClick={() => { this.sortPostsBy('timestamp'); }}>Date</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { posts } = state;
  return {
    posts,
  };
};

export default connect(mapStateToProps)(PostsSort);

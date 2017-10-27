import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table, {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import { orderPosts } from '../actions/posts';

const PostsSort = (props) => {
  const { orderDesc, orderBy, dispatch } = props;
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'voteScore'}
                direction={orderDesc ? 'desc' : 'asc'}
                onClick={() => { dispatch(orderPosts(!orderDesc, 'voteScore')); }}
              >
                Votes
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'timestamp'}
                direction={orderDesc ? 'desc' : 'asc'}
                onClick={() => { dispatch(orderPosts(!orderDesc, 'timestamp')); }}
              >
                Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  );
};

PostsSort.propTypes = {
  orderDesc: PropTypes.bool.isRequired,
  orderBy: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { posts } = state;
  return {
    posts,
  };
};

export default connect(mapStateToProps)(PostsSort);

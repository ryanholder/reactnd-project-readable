import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';


import { addRecipe, removeFromCalendar } from '../actions';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 'Ryan Holder', 6.0, 24, 4.0),
  createData('Ice cream sandwich', 'Ryan Holder', 9.0, 37, 4.3),
  createData('Eclair', 'Ryan Holder', 16.0, 24, 6.0),
  createData('Cupcake', 'Ryan Holder', 3.7, 67, 4.3),
  createData('Gingerbread', 'Ryan Holder', 16.0, 49, 3.9),
];

const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>,
  },
  { path: '/bubblegum',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>,
  },
  { path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>,
  },
];

function App(props) {
  console.log(props);
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography type="title" color="inherit" className={'appTitle'}>
            <FormControl>
              <Select value="all">
                <MenuItem value="all">All Posts</MenuItem>
                <MenuItem value="react">React</MenuItem>
                <MenuItem value="redux">Redux</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Typography>
          <Button raised color="accent">
            Add Post
          </Button>
        </Toolbar>
      </AppBar>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell numeric>Comments</TableCell>
              <TableCell numeric>Score</TableCell>
              <TableCell numeric></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.name}</TableCell>
                  <TableCell>{n.calories}</TableCell>
                  <TableCell numeric>{n.fat}</TableCell>
                  <TableCell numeric>{n.carbs}</TableCell>
                  <TableCell numeric>
                    <IconButton color="primary" aria-label="Vote Up">
                      <AddShoppingCartIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="Vote Down">
                      <AddShoppingCartIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

function mapStateToProps({ food, calendar }) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
          : null;

        return meals;
      }, {}),
    })),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectRecipe: data => dispatch(addRecipe(data)),
    remove: data => dispatch(removeFromCalendar(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

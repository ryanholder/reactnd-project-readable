import React from 'react';
import { CardHeader } from 'material-ui/Card';
import Timestamp from 'react-timestamp';
import Typography from 'material-ui/Typography';

const PostHeader = props => (
  <CardHeader
    title={
      <Typography type="title" gutterBottom>
        {props.title}
      </Typography>
    }
    subheader={
      <span>
        Written by: {props.author} on <Timestamp time={props.date / 1000} format="date" />
      </span>
    }
  />
);

export default PostHeader;

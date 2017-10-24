import React from 'react';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const PostContent = props => (
  <CardContent>
    <Typography component="p">
      {props.content}
    </Typography>
  </CardContent>
);

export default PostContent;

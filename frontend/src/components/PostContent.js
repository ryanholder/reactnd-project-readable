import React from 'react';
import PropTypes from 'prop-types';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const PostContent = props => (
  <CardContent>
    <Typography component="p">
      {props.content}
    </Typography>
  </CardContent>
);

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostContent;

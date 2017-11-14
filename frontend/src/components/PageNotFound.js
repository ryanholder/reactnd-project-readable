import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div className="page-not-found">
    <div className="grid-container">
      <h1>Page Not Found</h1>
      <p>Sorry, there is nothing to see here.</p>
      <p><Link to={'/'}>Back to Home</Link></p>
    </div>
  </div>
);

export default PageNotFound;

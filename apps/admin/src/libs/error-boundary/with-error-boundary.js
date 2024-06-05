import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from './error-boundary';

export const withErrorBoundary = (WrappedComponent) => {
  const WithErrorBoundary = (props) => (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return WithErrorBoundary;
};

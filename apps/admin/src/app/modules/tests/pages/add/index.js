import React from 'react';
import { Box } from '@mui/material';
import { withErrorBoundary } from 'libs/error-boundary';
import TestForm from '../../components/test-form';

const AddTest = () => {
  return (
    <Box>
      <TestForm />
    </Box>
  );
};

export default withErrorBoundary(AddTest);

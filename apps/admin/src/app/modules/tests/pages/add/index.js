import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { withErrorBoundary } from 'libs/error-boundary';
import { createTest } from '../../store';
import { useDispatch } from 'react-redux';
import { TestForm } from 'app/modules/tests/components';

const AddTest = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (values) => {
      dispatch(createTest(values));
    },
    [dispatch]
  );

  return (
    <Box>
      <TestForm handleSubmit={handleSubmit} />
    </Box>
  );
};

export default withErrorBoundary(AddTest);

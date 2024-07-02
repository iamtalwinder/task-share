import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';

import { withErrorBoundary } from 'libs/error-boundary';
import { TaskForm } from 'app/modules/task/components';
import { createTask } from 'app/modules/task/store';

const AddTask = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (values) => {
      dispatch(createTask(values));
    },
    [dispatch]
  );

  return (
    <Box>
      <TaskForm handleSubmit={handleSubmit} />
    </Box>
  );
};

export default withErrorBoundary(AddTask);

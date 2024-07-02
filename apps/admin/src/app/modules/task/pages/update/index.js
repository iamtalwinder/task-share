import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { withErrorBoundary } from 'libs/error-boundary';
import { getTask, updateTask, selectTasks } from 'app/modules/task/store';
import { TaskForm } from 'app/modules/task/components';

const UpdateTask = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const tasks = useSelector(selectTasks);
  const [task, setTask] = useState(null);

  useEffect(() => {
    dispatch(getTask(taskId)).then(() => {
      const foundTask = tasks.find((t) => t.id === taskId);
      if (foundTask) {
        setTask(foundTask);
      }
    });
  }, [dispatch, taskId, tasks]);

  const handleSubmit = useCallback(
    (values) => {
      dispatch(updateTask({ taskId, updatedTask: values }));
    },
    [dispatch, taskId]
  );

  return <Box>{task ? <TaskForm task={task} handleSubmit={handleSubmit} isEditing={true} /> : <div>Loading task details...</div>}</Box>;
};

export default withErrorBoundary(UpdateTask);

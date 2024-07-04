import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, Chip, Button, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { viewTask, selectSelectedTask, selectViewTaskStatus } from 'app/modules/task/store'; // Updated imports
import { styleNames } from 'libs/style-names';
import { withErrorBoundary } from 'libs/error-boundary';
import styles from './view-task.module.scss';

const sn = styleNames(styles);

const ViewTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);
  const viewTaskStatus = useSelector(selectViewTaskStatus);

  useEffect(() => {
    if (taskId) {
      dispatch(viewTask(taskId));
    }
  }, [dispatch, taskId]);

  const handleBack = () => {
    navigate('/tasks');
  };

  return (
    <Box>
      {viewTaskStatus === 'loading' && <div>Loading task details...</div>}
      {viewTaskStatus === 'failed' && <div>Failed to load task details.</div>}
      {selectedTask && (
        <Card className={sn('card')}>
          <CardContent className={sn('content')}>
            <Box className={sn('content__task-title-container')}>
              <Typography className={sn('content__title')}>Task:</Typography>
              <Typography className={sn('content__title-heading')}>{selectedTask.title}</Typography>
            </Box>
            <Box>
              <Typography className={sn('content__title')}>Technologies Used</Typography>
              <Box className={sn('content__task-tags')}>
                {selectedTask.tags &&
                  selectedTask.tags.map((tag, index) => <Chip key={index} label={tag} className={sn('content__task-tags-used')} />)}
              </Box>
            </Box>
            <Divider className={sn('content__divider')} />
            <Box>
              <Typography className={sn('content__title')}>Task Description</Typography>
              <Box className={sn('markdown-preview-container')}>
                <ReactMarkdown>{selectedTask.description}</ReactMarkdown>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
      <Box className={sn('card__back-button')}>
        <Button variant="contained" onClick={handleBack}>
          Back to Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default withErrorBoundary(ViewTask);

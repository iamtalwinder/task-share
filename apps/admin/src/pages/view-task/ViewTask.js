import React from 'react';
import { Box, Card, CardContent, Typography, Chip, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';
import TASK_DESCRIPTION from '../../constants/markdown-data';
import { styleNames } from 'libs/style-names';
import { withErrorBoundary } from 'libs/error-boundary';

import styles from './ViewTask.module.scss';

const sn = styleNames(styles);

const ViewTask = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/tasks');
  }

  return (
    <Box>
      <Card className={sn('card')}>
        <CardContent className={sn('content')}>
          <Box className={sn('content__task-title-container')}>
            <Typography className={sn('content__title')}>Task: </Typography>
            <Typography className={sn('content__title-heading')}>Implement Snackbar Notifications with Redux</Typography>
          </Box>
          <Box>
            <Typography className={sn('content__title')}>Technologies Used</Typography>
            <Box className={sn('content__task-tags')}>
              <Chip label="React" className={sn('content__task-tags-used')} />
              <Chip label="TypeScript" className={sn('content__task-tags-used')} />
              <Chip label="Redux and Redux ToolKit" className={sn('content__task-tags-used')} />
              <Chip label="Material UI" className={sn('content__task-tags-used')} />
            </Box>
          </Box>
          <Divider className={sn('content__divider')} />
          <Box>
            <Typography className={sn('content__title')}>Task Description</Typography>
            <Box className={sn('markdown-preview-container')}>
              <ReactMarkdown>{TASK_DESCRIPTION}</ReactMarkdown>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Box className={sn('card__back-button')}>
        <Button variant='contained' onClick={handleBack}>Back to Home Page</Button>
      </Box>
    </Box>
  )
}
export default withErrorBoundary(ViewTask);
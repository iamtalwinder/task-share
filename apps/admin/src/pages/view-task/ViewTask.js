import React from 'react';
import { Box, Card, CardContent, Typography, Chip, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';
import TASK_DESCRIPTION from '../../constants/markdown-data';
import './ViewTask.scss';

const ViewTask = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/tasks');
  }

  return (
    <Box>
      <Card className='card'>
        <CardContent className='content'>
          <Box className='content__task-title-container'>
            <Typography className='content__title'>Task: </Typography>
            <Typography className='content__title-heading'>Implement Snackbar Notifications with Redux</Typography>
          </Box>
          <Box>
            <Typography className='content__title'>Technologies Used</Typography>
            <Box className='content__task-tags'>
              <Chip label="React" className='content__task-tags-used'/>
              <Chip label="TypeScript" className='content__task-tags-used'/>
              <Chip label="Redux and Redux ToolKit" className='content__task-tags-used'/>
              <Chip label="Material UI" className='content__task-tags-used'/>
            </Box>
          </Box>
          <Divider className='content__divider' />
          <Box className='content__task-description'>
            <Typography className='content__title'>Task Description</Typography>
            <Box className='markdown-preview-container'>
              <ReactMarkdown>{TASK_DESCRIPTION}</ReactMarkdown>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <Button variant='contained' onClick={handleBack}>Back to Home Page</Button>
      </Box>
    </Box>
  )
}
export default ViewTask;
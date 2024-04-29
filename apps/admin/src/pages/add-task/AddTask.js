import React from 'react';
import { Button, Grid, Card, Box, CardContent, Typography, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MuiChipsInput } from 'mui-chips-input';
import './AddTask.scss';
import MarkdownEditor from 'components/text-editor/TextEditor';

const AddTask = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    tags: yup.array().min(1, 'At least one tag is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      tags: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCancle = () => {
    navigate('/');
  }

  return (
    <Box>
      <Card>
        <CardContent>
          <Box className='new-task'>
            <Typography variant="h5" component="div" className='new-task__title'>
              Add New Task
            </Typography>
            <Box>
              <Button variant="contained"
                color="error"
                onClick={handleCancle}
                className='new-task__cancel-btn'
              >
                Cancel
              </Button>
              <Button variant="contained"
                onClick={formik.handleSubmit}
                className='new-task__add-btn'
              >
                Add Task
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card className='card'>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  placeholder="Enter Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiChipsInput
                  value={formik.values.tags}
                  onChange={(tags) => formik.setFieldValue('tags', tags)}
                  placeholder='Type tags you want to add'
                  error={formik.touched.tags && Boolean(formik.errors.tags)}
                  helperText={formik.touched.tags && formik.errors.tags}
                  className='card__chip-input'
                />
              </Grid>
            </Grid>
          </form>
          <Divider className='card__divider' />
          <Box>
            <Typography sx={{ fontSize: 24 }}>Description</Typography>
            <MarkdownEditor />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddTask;

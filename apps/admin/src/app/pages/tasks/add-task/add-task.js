import React from 'react';
import { Button, Grid, Card, Box, CardContent, Typography, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MuiChipsInput } from 'mui-chips-input';
import MarkdownEditor from 'app/ui-component/text-editor/TextEditor';
import { useParams } from 'react-router-dom';
import { styleNames } from 'libs/style-names';
import { withErrorBoundary } from 'libs/error-boundary';
import styles from './add-task.module.scss';
import { useDispatch } from 'react-redux';
import { createTask } from '../store/tasks.slice';


const sn = styleNames(styles);

const AddTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    tags: yup.array().min(1, 'At least one tag is required')
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      tags: []
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createTask({
        title: values.title,
        tags: values.tags,
      }));
      
      navigate('/tasks');
    }
  });

  const handleCancel = () => {
    navigate('/tasks');
  };

  React.useEffect(() => {
    if (id) {
      formik.setValues({
        title: 'Create todo list',
        tags: ['React', 'TypeScript']
      });
    }
  }, [id, formik]);

  return (
    <Box>
      <Card>
        <CardContent>
          <Box className={sn('new-task')}>
            <Typography variant="h5" component="div" className={sn('new-task__title')}>
              {id ? 'Edit Task' : 'Add New Task'}
            </Typography>
            <Box>
              <Button variant="contained" color="error" onClick={handleCancel} className={sn('new-task__cancel-btn')}>
                Cancel
              </Button>
              <Button variant="contained" onClick={formik.handleSubmit} className={sn('new-task__add-btn')}>
                {id ? 'Edit Task' : 'Add Task'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card className={sn('card')}>
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
                  placeholder="Type tags you want to add"
                  error={formik.touched.tags && Boolean(formik.errors.tags)}
                  helperText={formik.touched.tags && formik.errors.tags}
                  className={sn('card__chip-input')}
                />
              </Grid>
            </Grid>
          </form>
          <Divider className={sn('card__divider')} />
          <Box>
            <Typography sx={{ fontSize: 24 }}>Description</Typography>
            <MarkdownEditor />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default withErrorBoundary(AddTask);

import React from 'react';
import { Button, Grid, Card, Box, CardContent, Typography, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MuiChipsInput } from 'mui-chips-input';

import MarkdownEditor from 'app/ui-component/text-editor/TextEditor';
import { styleNames } from 'libs/style-names';
import styles from './task-form.module.scss';

const sn = styleNames(styles);

export const TaskForm = (props) => {
  const {task, handleSubmit, isEditing = false} = props;

  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    tags: yup.array().min(1, 'At least one tag is required'),
    description: yup.string().required('Description is required')
  });

  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      tags: task?.tags || [],
      description: task?.description || ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      navigate('/tasks');
    }
  });

  const handleCancel = () => {
    navigate('/tasks');
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box className={sn('header')}>
            <Typography variant="h5" component="div" className={sn('header__title')}>
              {isEditing ? 'Update' : 'Create'}
            </Typography>
            <Box>
              <Button variant="contained" color="error" onClick={handleCancel} className={sn('header__cancel-btn')}>
                Cancel
              </Button>
              <Button variant="contained" onClick={formik.handleSubmit} className={sn('header__add-btn')}>
                {isEditing ? 'Update' : 'Create'}
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
            <MarkdownEditor
              name="description"
              value={formik.values.description}
              onChange={(name, value) => formik.setFieldValue(name, value)}
            />
            {formik.touched.description && formik.errors.description && <Typography color="error">{formik.errors.description}</Typography>}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

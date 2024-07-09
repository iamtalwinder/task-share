import React from 'react';
import { Button, Grid, Card, Box, CardContent, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MultipleTaskSelect from 'app/ui-component/select-task/SelectTask';
import { styleNames } from 'libs/style-names';
import styles from './test-form.module.scss';
import PropTypes from 'prop-types';

const sn = styleNames(styles);

export const TestForm = (props) => {
  const { test, handleSubmit, isEditing = false } = props;
  const navigate = useNavigate();

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    tasks: yup.array().min(1, 'At least one task is required')
  });

  const formik = useFormik({
    initialValues: {
      title: test?.title || '',
      tasks: test?.tasks || []
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      navigate('/tests');
    }
  });

  const handleCancel = () => {
    navigate('/tests');
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box className={sn('new-test')}>
            <Typography variant="h5" component="div" className={sn('new-test__title')}>
              {isEditing ? 'Update' : 'Create'}
            </Typography>
            <Box>
              <Button variant="contained" color="error" onClick={handleCancel} className={sn('new-test__cancel-btn')}>
                Cancel
              </Button>
              <Button variant="contained" onClick={formik.handleSubmit} className={sn('new-test__add-btn')}>
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
                <MultipleTaskSelect
                  name='tasks'
                  value={formik.values.tasks}
                  onChange={formik.setFieldValue}
                />
                {formik.touched.tasks && formik.errors.tasks && <Typography color="error">{formik.errors.tasks}</Typography>}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

TestForm.propTypes = {
  test: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
};

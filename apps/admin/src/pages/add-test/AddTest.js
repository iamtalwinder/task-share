import React from 'react';
import { Button, Grid, Card, Box, CardContent, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import './AddTest.scss';
import MultipleTaskSelect from 'components/select-task/SelectTask';

const AddTest = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    task: yup.array().min(1, 'At least one task is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      task: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCancel = () => {
    navigate('/tests');
  }

  React.useEffect(() => {
    if (id) {
      formik.setValues({
        title: 'Todo List',
        task: ['Create todo list', '', 'Snackbar with mui'],
      });
    }
  }, [id]);

  return (
    <Box>
      <Card>
        <CardContent>
          <Box className='new-test'>
            <Typography variant="h5" component="div" className='new-test__title'>
              {id ? 'Edit Test' : 'Add New test'}
            </Typography>
            <Box>
              <Button variant="contained"
                color="error"
                onClick={handleCancel}
                className='new-test__cancel-btn'
              >
                Cancel
              </Button>
              <Button variant="contained"
                onClick={formik.handleSubmit}
                className='new-test__add-btn'
              >
                {id ? 'Edit Test' : 'Add New Test'}
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
                <MultipleTaskSelect />
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddTest;
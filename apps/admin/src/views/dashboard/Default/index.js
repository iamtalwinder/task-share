
import React from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

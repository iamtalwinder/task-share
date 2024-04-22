import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import styles from './task.module.css';

function createData(title, status) {
  return { title, status };
}

const rows = [
  createData('Create todo list', 'Used'),
  createData('Create user form using redux', 'Not Used'),
];

const TaskTable = () => {
  return (
    <Box>
      <Card sx={{ width: '100%', marginBottom: 3 }}>
        <CardContent>
          <Button variant='outlined'>
            <AddIcon sx={{ marginRight: 1 }} />
            Add Button</Button>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Title</TableCell>
              <TableCell align='center'>Tags</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{row.title}</TableCell>
                <TableCell align='center'>
                  <Chip label="React" className={styles.chip} />
                  <Chip label="TypeScript" />
                </TableCell>
                <TableCell align='center'>{row.status}</TableCell>
                <TableCell align='center'>
                  <Button variant='outlined' className={styles.btn}>Edit</Button>
                  <Button variant='outlined' className={styles.btn}>View</Button>
                  <Button variant='outlined' className={styles.btn}>Delete</Button>
                  <Button variant='outlined' >Generate Link</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TaskTable;

import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './task.module.css';
import Addtask from 'components/add-task/add-task';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import AddLinkIcon from '@mui/icons-material/AddLink';
import DownloadIcon from '@mui/icons-material/Download';

function createData(title, status) {
  return { title, status };
}

const rows = [
  createData('Create todo list', "used"),
  createData('Create user form using redux', "not used"),
];

const TaskTable = () => {
  const [isAddFormVisible, setIsAddFormVisible] = React.useState(false);
  const [isGenerateLink, setIsGenerateLink] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleGenerateLink();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddButtonClick = () => {
    setIsAddFormVisible(true);
  };

  const handleGenerateLink = () => {
    setIsGenerateLink(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Card sx={{ width: '100%', marginBottom: 3 }}>
        <CardContent>
          <Link to='/add-task' style={{ textDecoration: 'none' }}>
            <Button variant='outlined' onClick={handleAddButtonClick}>
              <AddIcon sx={{ marginRight: 1 }} />
              Add New Task
            </Button>
          </Link>
        </CardContent>
      </Card>

      {isAddFormVisible && <Addtask />}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Tags</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">
                  <Chip label="React" className={styles.chip} />
                  <Chip label="TypeScript" />
                </TableCell>
                <TableCell align="center">
                  <Chip label={row.status} className={styles.chip} />
                </TableCell>
                <TableCell align="center">
                  <Button className={styles.btn}><EditIcon className={styles.icon} /></Button>
                  <Button className={styles.btn}><RemoveRedEyeIcon className={styles.icon} /></Button>
                  <Button className={styles.btn}><DeleteIcon className={styles.icon} /></Button>
                  <Button className={styles.btn} onClick={handleClick}>
                    <MoreVertIcon className={styles.icon} />
                  </Button>
                </TableCell>
                {(isGenerateLink &&
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    <Paper sx={{ maxHeight: '100vh', width: '150px', padding: 1, textAlign: 'center' }}>
                      <Button className={styles.link}>
                        <AddLinkIcon className={styles.actionIcon} />
                        <Typography>Generate Link</Typography>
                      </Button>
                      <Button className={styles.link}>
                        <DownloadIcon className={styles.actionIcon} />
                        <Typography>Download</Typography>
                      </Button>
                    </Paper>
                  </Popover>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaskTable;

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import AddLinkIcon from '@mui/icons-material/AddLink';
import DownloadIcon from '@mui/icons-material/Download';
import './Tasks.scss';

function createData(id, title, status) {
  return { id, title, status };
}

const rows = [
  createData('1','Create todo list', "used"),
  createData('2','Create user form using redux', "not used"),
];

const TaskTable = () => {
  const [isGenerateLink, setIsGenerateLink] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleGenerateLink();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddButtonClick = () => {
    navigate('/task/add')
  };

  const handleGenerateLink = () => {
    setIsGenerateLink(true);
  };

  const handleEdit = (data) => {
    navigate(`/task/${data.id}/edit`)
  }

  const handleViewTask = () => {
    navigate('/task/view');
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Card className='card'>
        <CardContent>
          <Button variant='outlined' onClick={handleAddButtonClick}
            className='card__add-new-task'>
            <AddIcon className='card__add-icon' />
            Add New Task
          </Button>
        </CardContent>
      </Card>

      <TableContainer component={Paper} className='table'>
        <Table aria-label='simple table' className='table__wrapper'>
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
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">
                  <Chip label="React" className='table__chip' />
                  <Chip label="TypeScript" />
                </TableCell>
                <TableCell align="center">
                  <Chip label={row.status} className='table__chip' />
                </TableCell>
                <TableCell align="center">
                  <Button className='table__action-button' onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </Button>
                  <Button className='table__action-button' onClick={handleViewTask}>
                    <RemoveRedEyeIcon />
                  </Button>
                  <Button className='table__action-button'>
                    <DeleteIcon />
                  </Button>
                  <Button className='table__action-button' onClick={handleClick}>
                    <MoreVertIcon />
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
                    <Paper className='paper'>
                      <Button className='paper__extra-actions'>
                        <AddLinkIcon className='paper__extra-icon' />
                        <Typography>Generate Link</Typography>
                      </Button>
                      <Button className='paper__extra-actions'>
                        <DownloadIcon className='paper__extra-icon' />
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

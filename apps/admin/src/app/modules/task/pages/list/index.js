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
import { styleNames } from 'libs/style-names';
import { withErrorBoundary } from 'libs/error-boundary';
import styles from './task-list.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getUserTasks, selectTasks } from '../../store/tasks.slice';
import CustomNotification from 'app/ui-component/snackbar/customNotification';
import { showMessage } from 'app/ui-component/snackbar/notificationSlice.slice';

const sn = styleNames(styles);

const TaskList = () => {
  const [isGenerateLink, setIsGenerateLink] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTasks());
  }, [dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleGenerateLink();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddButtonClick = () => {
    navigate('/task/add');
  };

  const handleGenerateLink = () => {
    setIsGenerateLink(true);
  };

  const handleEdit = (data) => {
    navigate(`/task/${data.id}/edit`);
  };

  const handleViewTask = (data) => {
    navigate(`/task/${data.id}/view`);
  };

  const handleDeleteTask = async (data) => {
    try {
      const resultAction = dispatch(deleteTask(data.id));
      dispatch(
        showMessage({
          message: 'Task deleted successfully!',
          duration: 3000,
          severity: 'success',
        })
      );
      return resultAction;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'An error occurred while trying to delete the task.',
          duration: 3000,
          severity: 'error',
        })
      );
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Card className={sn('card')}>
        <CardContent>
          <Button variant="outlined" onClick={handleAddButtonClick} className={sn('card__add-new-task')}>
            <AddIcon className={sn('card__add-icon')} />
            Add New Task
          </Button>
        </CardContent>
      </Card>

      <TableContainer component={Paper} className={sn('table')}>
        <Table aria-label="simple table" className={sn('table__wrapper')}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Tags</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell>
                  {row.tags && row.tags.map((tag, index) => <Chip key={index} label={tag} className={sn('table__chip')} />)}
                </TableCell>
                <TableCell align="center">
                  <Chip label={row.status} className={sn('table__chip')} />
                </TableCell>
                <TableCell align="center">
                  <Button className={sn('table__action-button')} onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </Button>
                  <Button className={sn('table__action-button')} onClick={() => handleViewTask(row)}>
                    <RemoveRedEyeIcon />
                  </Button>
                  <Button className={sn('table__action-button')} onClick={() => handleDeleteTask(row)}>
                    <DeleteIcon />
                  </Button>
                  <Button className={sn('table__action-button')} onClick={handleClick}>
                    <MoreVertIcon />
                  </Button>
                </TableCell>
                {isGenerateLink && (
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
                    <Paper className={sn('paper')}>
                      <Button className={sn('paper__extra-actions')}>
                        <AddLinkIcon className={sn('paper__extra-icon')} />
                        <Typography>Generate Link</Typography>
                      </Button>
                      <Button className={sn('paper__extra-actions')}>
                        <DownloadIcon className={sn('paper__extra-icon')} />
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

      <CustomNotification />
    </Box>
  );
};

export default withErrorBoundary(TaskList);

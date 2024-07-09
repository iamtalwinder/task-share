import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, MenuItem, FormControl, Select, Chip, InputLabel, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { Container, Draggable } from 'react-smooth-dnd';
import { arrayMoveImmutable as arrayMove } from 'array-move';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { styleNames } from 'libs/style-names';
import { withErrorBoundary } from 'libs/error-boundary';
import styles from './SelectTask.module.scss';
import { tests } from 'mocks/data'; // Ensure this path is correct

const sn = styleNames(styles);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, taskName, theme) {
  return {
    fontWeight: taskName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

const MultipleTaskSelect = ({ name, value, onChange }) => {
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = React.useState(value || []);

  // Extract and deduplicate tasks from tests
  const tasks = React.useMemo(() => {
    if (!tests) return [];
    return Array.from(
      new Map(
        tests.flatMap(test => test.tasks).map(task => [task.taskId, task])
      ).values()
    );
  }, [tests]);

  const handleChange = (event) => {
    const { target: { value: selectedValues } } = event;
    const newSelectedItems = selectedValues.map((id) => tasks.find((task) => task.taskId === id));
    setSelectedItems(newSelectedItems);
    onChange(name, newSelectedItems);
  };

  const onDrop = ({ removedIndex, addedIndex }) => {
    const updatedItems = arrayMove(selectedItems, removedIndex, addedIndex);
    setSelectedItems(updatedItems);
    onChange(name, updatedItems);
  };

  return (
    <Box>
      <Typography className={sn('input__label')}>Select task from the below list</Typography>
      <FormControl className={sn('form')}>
        <InputLabel id="select-task-label">Select Task</InputLabel>
        <Select
          label="Select Task"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedItems.map((item) => item.taskId)}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box className={sn('form__selected-task')}>
              {selected.map((taskId) => {
                const task = tasks.find((task) => task.taskId === taskId);
                return <Chip key={taskId} label={task?.name} />;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tasks.map((task) => (
            <MenuItem
              key={task.taskId}
              value={task.taskId}
              style={getStyles(
                task.name,
                selectedItems.map((item) => item.taskId),
                theme
              )}
            >
              {task.name}
            </MenuItem>
          ))}
        </Select>
        <List sx={{ paddingTop: ITEM_PADDING_TOP }}>
          <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
            {selectedItems.map(({ taskId, name }) => (
              <Draggable key={taskId}>
                <ListItem>
                  <ListItemText primary={name} />
                  <ListItemSecondaryAction>
                    <ListItemIcon className="drag-handle">
                      <DragHandleIcon />
                    </ListItemIcon>
                  </ListItemSecondaryAction>
                </ListItem>
              </Draggable>
            ))}
          </Container>
        </List>
      </FormControl>
    </Box>
  );
};

export default withErrorBoundary(MultipleTaskSelect);

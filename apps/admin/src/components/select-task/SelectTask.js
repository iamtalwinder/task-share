import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, MenuItem, FormControl, Select, Chip, InputLabel, Typography } from '@mui/material';
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable as arrayMove } from "array-move";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DragHandleIcon from "@material-ui/icons/DragHandle";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Todo App',
  'Snackbar using material ui',
  'Register Form React-Redux',
  'Login Form Using React-Redux',
  'DashBoard Screen using Redux Toolkit',
];

function getStyles(name, taskName, theme) {
  return {
    fontWeight:
      taskName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleTaskSelect = () => {
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newSelectedItems = value.map((name) => ({ id: name, text: name }));
    setSelectedItems(newSelectedItems);
  };

  const onDrop = ({ removedIndex, addedIndex }) => {
    setSelectedItems(arrayMove(selectedItems, removedIndex, addedIndex));
  };


  return (
    <Box>
      <Typography sx={{ marginBottom: '15px' }}>Select task from the below list</Typography>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="select-task-label">Select Task</InputLabel>
        <Select
          label='Select Task'
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedItems.map((item) => item.id)}
          onChange={handleChange}
          // input={<OutlinedInput id="select-multiple-chip" label="Select Task" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedItems.map((item) => item.id), theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <List sx={{ ITEM_PADDING_TOP }}>
          <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
            {selectedItems.map(({ id, text }) => (
              <Draggable key={id}>
                <ListItem>
                  <ListItemText primary={text} />
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
}

export default MultipleTaskSelect;
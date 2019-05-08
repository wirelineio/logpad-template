
import React, { Component } from 'react';
import memoizeOne from 'memoize-one';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { withLogView } from '@wirelineio/appkit';

const styles = (theme) => ({
  root: {
    flex: 1,
    padding: theme.spacing.unit * 2
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemField: {
    width: 450,
    marginRight: theme.spacing.unit * 2
  },
  itemText: {
    width: 400,
    marginRight: theme.spacing.unit * 2
  },
  completed: {
    width: 400,
    marginRight: theme.spacing.unit * 2,
    textDecoration: 'line-through'
  }
});

class Pad extends Component {
  state = {
    text: ''
  }

  compileList = memoizeOne((logs = []) => {
    // Compile List of items.
    let list = logs.filter(change => change.action === 'add').map(change => change.payload);
    // Process removed items.
    logs.filter(change => change.action === 'remove').forEach(change => {
      const index = list.findIndex(item => item.id === change.payload.id);
      if (index !== -1) {
        list = [
          ...list.slice(0, index),
          ...list.slice(index + 1)
        ];
      }
    });
    // Apply changes.
    logs.filter(change => change.action === 'modify').forEach(change => {
      const index = list.findIndex(item => item.id === change.payload.id);
      if (index !== -1) {
        list = [
          ...list.slice(0, index),
          {
            ...list[index],
            ...change.payload
          },
          ...list.slice(index + 1)
        ];
      }
    });

    return list;
  })

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  handleAdd = async () => {
    const { text } = this.state;
    const { appendChange } = this.props;

    await appendChange({
      action: 'add',
      payload: {
        id: Date.now(),
        text: text || 'Item',
        completed: false
      }
    });

    this.setState({
      text: ''
    });
  }

  handleRemove = (item) => async () => {
    const { appendChange } = this.props;
    await appendChange({
      action: 'remove',
      payload: {
        ...item
      }
    })
  }  

  handleToggleComplete = (item) => async (event) => {
    const { appendChange } = this.props;

    await appendChange({
      action: 'modify',
      payload: {
        ...item,
        completed: !item.completed
      }
    })
  }

  render() {
    const { text } = this.state;
    const { title, logs, classes } = this.props;

    const items = this.compileList(logs);

    return (
      <Grid container direction="column" className={classes.root}>
        <Typography variant="h5">{title}</Typography>
        <Grid item className={classes.item}>
          <TextField
            value={text}
            onChange={this.handleTextChange}
            margin="normal"
            className={classes.itemField}
          />
          <Button
            onClick={this.handleAdd}
            variant="contained"
            color="primary"
            disabled={!text}
          >
            Add
          </Button>
        </Grid>
        {items.map(item => (
          <Grid item key={item.id} className={classes.item}>
            <Checkbox
              checked={item.completed}
              onChange={this.handleToggleComplete(item)}
              color="primary"
            />
            <Typography variant="body1" component="span" className={item.completed ? classes.completed : classes.itemText} >{item.text}</Typography>
            <Button variant="contained" color="secondary" onClick={this.handleRemove(item)}>Remove</Button>            
          </Grid>
        ))}
      </Grid>
    );
  }
}

export const VIEW = 'example';
export const TYPE = 'example'

export default withLogView({ view: VIEW })(withStyles(styles)(Pad));

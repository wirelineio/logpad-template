import React, { Component } from 'react';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

const styles = () => ({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },

  column: {
    display: 'flex',
    width: 500
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    display: 'flex',
    flex: 1,

    '& input': {
      fontSize: 20
    }
  },

  itemTitle: {
    display: 'flex',
    flex: 1,
    fontSize: 20
  },

  completed: {
    textDecoration: 'line-through'
  }
});

class ItemList extends Component {
  state = {
    text: ''
  };

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  handleKeyPress = (event) => {
    switch (event.key) {
      case 'Enter': {
        this.handleAdd();
        break;
      }

      default: break;
    }
  };

  handleAdd = async () => {
    const { text } = this.state;
    const { onCreate } = this.props;
    if (!text) {
      this._text.focus();
      return;
    }

    await onCreate(text);

    this.setState({
      text: ''
    }, () => {
      this._text.focus();
    });
  };

  handleToggleComplete = item => async () => {
    const { onToggleCheck } = this.props;
    await onToggleCheck(item);
  }

  render() {
    const { classes, items = [] } = this.props;
    const { text } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.column}>
          <Grid container direction="column">
            <Grid item className={classes.item}>
              <Checkbox style={{ visibility: 'hidden' }} />
              <TextField
                inputRef={el => { this._text = el; }}
                value={text}
                onChange={this.handleTextChange}
                onKeyPress={this.handleKeyPress}
                margin="normal"
                autoFocus
                className={classes.itemText}
              />
              <IconButton onClick={this.handleAdd}>
                <AddIcon />
              </IconButton>
            </Grid>

            {items.map(item => (
              <Grid item key={item.id} className={classes.item}>
                <Checkbox
                  checked={item.completed}
                  onChange={this.handleToggleComplete(item)}
                  color="primary"
                />
                <Typography
                  component="span"
                  className={classNames(classes.itemTitle, item.completed && classes.completed)}
                >
                  {item.text}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>


    //   <div className={classes.root}>
    //     <input 
    //       ref={el => this._input = el} 
    //       type="text" 
    //       className={classes.input} 
    //       onKeyUp={this.handleKeyUp} 
    //       spellCheck={false}
    //     />

    //     {items.map(item => (
    //       <div key={item.id} className={classes.item}>
    //         <Checkbox
    //           checked={item.completed}
    //           onChange={() => onChecked(item)}
    //           color="primary"
    //         />
    //         <Typography
    //           component="span"
    //           className={item.completed && classes.completed}
    //           >
    //           {item.text}
    //         </Typography>            
    //       </div>
    //     ))}
    //   </div>
    );
  }
}

export default withStyles(styles)(ItemList);

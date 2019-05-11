import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// TODO(burdon): Factor out (move to @wirelineio/gem)

const styles = () => ({
  root: {
    margin: 32
  },

  input: {
    outline: 'none',
    fontFamily: 'sans-serif',
    fontSize: 20,
    width: 300,
    marginBottom: 8
  },

  item: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    margin: 3
  }
});

class ItemList extends Component {

  handleKeyUp = (event) => {
    const { onCreate } = this.props;

    if (event.key === 'Enter' && event.target.value) {
      onCreate(event.target.value);
      this._input.value = '';
    }
  };

  render() {
    const { classes, items = [] } = this.props;

    return (
      <div className={classes.root}>
        <input 
          ref={el => this._input = el} 
          type="text" 
          className={classes.input} 
          onKeyUp={this.handleKeyUp} 
          spellCheck={false}
        />

        {items.map(item => (
          <div key={item.id} className={classes.item}>{item.text}</div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(ItemList);

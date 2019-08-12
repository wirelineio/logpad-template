import React, { Component } from 'react';

import { withLogView } from '@wirelineio/appkit';

import ItemList from './lib/ItemList';
import { computeItems } from './lib/Payload';

import Defs from './defs';

class Pad extends Component {

  static getDerivedStateFromProps(props, state) {
    const { view: { log } } = props;

    return {
      items: computeItems(log)
    };
  }

  state = {
    items: []
  };

  handleCreate = async (text) => {
    const { view } = this.props;

    await view.appendChange({
      action: 'add',
      payload: {
        id: Date.now(),
        text,
        completed: false
      }      
    });
  };

  handleCheck = async (item) => {
    console.log(item)
    const { view } = this.props;
    await view.appendChange({
      action: 'modify',
      payload: {
        ...item,
        completed: !item.completed
      }
    })
  }

  render() {
    const { items } = this.state;

    return (
      <ItemList items={items} onCreate={this.handleCreate} onToggleCheck={this.handleCheck} />
    );
  }
}

export default withLogView({ view: Defs.view })(Pad);

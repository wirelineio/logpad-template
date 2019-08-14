//
// Wireline SDK
//

import React, { Component } from 'react';

import { withLogView } from '@wirelineio/appkit';

import ItemList from './lib/ItemList';
import { computeItems } from './lib/Payload';

import Defs from './defs';

/**
 * The Pad component is wrapped by the `withLogView` 
 * higher-order-component, which injects the `view` property.
 */
class Pad extends Component {

  static getDerivedStateFromProps(props, state) {
    const { view } = props;

    if (state.local) {
      return { local: false };
    }

    return {
      items: computeItems(view.log)
    };
  }

  state = {};

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
    const { view } = this.props;
    await view.appendChange({
      action: 'modify',
      payload: {
        ...item,
        completed: !item.completed
      }
    })
  };

  render() {
    const { items } = this.state;

    return (
      <ItemList 
        items={items} 
        onCreate={this.handleCreate} 
        onToggleCheck={this.handleCheck} 
      />
    );
  }
}

export default withLogView({ view: Defs.view })(Pad);

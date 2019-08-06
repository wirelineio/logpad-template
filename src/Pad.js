import React, { Component } from 'react';

import { withLogView } from '@wirelineio/appkit';

import ItemList from './lib/ItemList';

import Defs from './defs';

class Pad extends Component {

  handleCreate = async (text) => {
    const { view } = this.props;

    await view.appendChange({ id: Date.now(), text });
  };

  render() {
    const { view } = this.props;

    return (
      <ItemList items={view.log} onCreate={this.handleCreate} />
    );
  }
}

export default withLogView({ view: Defs.view })(Pad);

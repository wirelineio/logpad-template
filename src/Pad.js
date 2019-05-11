import React, { Component } from 'react';

import { withLogView } from '@wirelineio/appkit';

import ItemList from './lib/ItemList';

import { view } from './defs';

class Pad extends Component {

  handleCreate = async (text) => {
    const { appendChange } = this.props;

    await appendChange({ id: Date.now(), text });
  };

  render() {
    const { logs = [] } = this.props;

    return (
      <ItemList items={logs} onCreate={this.handleCreate} />
    );
  }
}

export default withLogView({ view })(Pad);

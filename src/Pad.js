
import React, { Component } from 'react';
import { view } from './def';

import { withLogView } from '@wirelineio/appkit';

class Pad extends Component {

  render() {
    const { title, logs = [], appendChange } = this.props;

    const handleKeyUp = async (event) => {
      if(event.key === 'Enter') {
        await appendChange({ id: Date.now(), text: event.target.value })
      }
    }

    return (
      <ul>
        <li>{title}</li>
        <li>
          <input type="text" onKeyUp={handleKeyUp} />
        </li>
        {logs.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}


export default withLogView({ view })(Pad);


import React, { Component } from 'react';

import { withLogView } from '@wirelineio/appkit';


class Todos extends Component {
  handleAdd() {
    const { appendChange } = this.props;
  }

  handleToggleComplete() {
    const { appendChange } = this.props;
  }

  render() {
    return <div>List</div>;
  }
}
export const VIEW = 'todolist';
export default withLogView({ view: VIEW })(Todos);

//
// Copyright 2019 Wireline, Inc.
//

import EditIcon from '@material-ui/icons/Edit';

import Todos, { VIEW } from './Todos';

export default {
  title: 'Todos',
  type: 'todo',
  view: VIEW,
  path: '/todo-list/:itemId',
  exact: true,
  main: Todos,
  listIcon: EditIcon
};

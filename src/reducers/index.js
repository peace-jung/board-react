import auth from './auth';
import card from './card';
import write from './write';
import comment from './comment';

import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  card,
  write,
  comment
});
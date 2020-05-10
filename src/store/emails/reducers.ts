import {fromJS, Map} from 'immutable';
import { TYPES } from './actions';
import { keyBy } from 'lodash';

const initialState = Map({
  emails: Map(),
  storedPages: 0,
});

const storeEmails = (state, emails) => {
  const newEmails = state.get('emails').merge(fromJS(keyBy(emails, 'id')));
  return state.set('emails', newEmails);
};

const setPage = (state, page) => {
  return state.set('storedPages', page);
}

const deleteEmails = (state, ids) => {
  const newEmails = state.get('emails').filter((email) => !ids.includes(email.get('id')));
  return state.set('emails', newEmails);
};

const reset = () => initialState;

const updateStatus = (state, payload) => {
  return storeEmails(state, [{id: payload.id, status: payload.status }]);
}

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.store:
      return storeEmails(state, action.payload);
    case TYPES.setStatus:
      return updateStatus(state, action.payload);
    case TYPES.setPage:
      return setPage(state, action.payload);
    case TYPES.delete:
      return deleteEmails(state, action.payload);
    case TYPES.reset:
      return reset();
    default:
      return state;
  }
};

export default emailReducer;
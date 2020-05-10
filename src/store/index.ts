import { createStore, applyMiddleware } from 'redux'
import emailReducer from './emails/reducers';
import thunk from 'redux-thunk';

const store = createStore(emailReducer, applyMiddleware(thunk));
window['store'] = store;
export default store;
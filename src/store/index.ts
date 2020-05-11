import { createStore, applyMiddleware } from 'redux'
import emailReducer from './emails/reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger({stateTransformer: (state) => state.toJS()})

const store = createStore(emailReducer, applyMiddleware(thunk, logger));
window['store'] = store;
export default store;
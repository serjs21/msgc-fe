import React from 'react';
import {ReleaseRequests, QuarantinedEmails} from './views'
import store from "./store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import {Provider} from 'react-redux';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='main-app'>
          <div className='navigation'>
            <NavLink to="/release_requests" className="option" activeClassName="selected">Release
              Requests</NavLink>
            <NavLink to="/quarantined_emails" className="option" activeClassName="selected">Quarantined
              Emails</NavLink>
          </div>
          <Switch>
            <Route path="/release_requests">
              <ReleaseRequests/>
            </Route>
            <Route path="/quarantined_emails">
              <QuarantinedEmails/>
            </Route>
            <Route render={() => <Redirect to="/release_requests"/>}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

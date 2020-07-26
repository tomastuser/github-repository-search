import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Intro from './Intro';
import UserNameInputForm from './UserNameInputForm';
import RepoOrgList from './RepoOrgList';

const App = () => {
  return (
    <Router>
      <div
        className='mainContainer'
        style={{ textAlign: 'center', color: '#1b1b1b' }}
      >
        <Switch>
          <Route exact path='/' component={Intro} />
          <Route exact path='/form' component={UserNameInputForm} />
          <Route path='/:username/list' component={RepoOrgList} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;

import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';

import MainWindow from './windows/MainWindow/container';
import LoadingWindow from './windows/LoadingWindow';

function App() {
  return (
    <HashRouter>
      <div className="react-app">
        <Switch>
          <Route exact path="/" component={MainWindow} />
          <Route path="/loading" component={LoadingWindow} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;

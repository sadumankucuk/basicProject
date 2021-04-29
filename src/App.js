import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

const App = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/data/:id" component={DetailPage} />
  </Switch>
);

export default App;

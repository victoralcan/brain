import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from './shared/error/error-boundary-route';
import PageNotFound from './shared/error/page-not-found';
import Home from './pages/home';
import Quiz from './pages/quiz';
import Menu from './pages/menu';
import Result from './pages/result';

function Routes() {
  return (
    <Switch>
      <ErrorBoundaryRoute exact path="/" component={Home} />
      <ErrorBoundaryRoute path="/quiz" component={Quiz} />
      <ErrorBoundaryRoute path="/menu" component={Menu} />
      <ErrorBoundaryRoute path="/result/:acertos" component={Result} />
      <ErrorBoundaryRoute path="/" component={PageNotFound} />
    </Switch>
  );
}

export default Routes;

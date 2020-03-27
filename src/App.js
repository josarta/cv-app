import React from 'react';
import GAListener from 'components/GAListener';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import './styles/reduction.scss';
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

function App() {
  return (
    <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <MainLayout>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
  );
}

export default App;

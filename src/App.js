import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary.js';
import Spinner from 'components/Spinner/Spinner';

const Diary = React.lazy(() => import('./components/Diary/Diary'));
const UserProfile = React.lazy(() =>
  import('./components/UserProfile/UserProfile')
);
const Reminders = React.lazy(() => import('./components/Reminders/Reminders'));
const PillsContainer = React.lazy(() =>
  import('./components/PillsContainer/PillsContainer')
);
const Landing = React.lazy(() => import('./components/Landing/Landing'));
const Loading = React.lazy(() => import('./components/Loading/Loading'));
const Identify = React.lazy(() => import('./components/Identify'));
const AddDosage = React.lazy(() => import('./components/AddDosage/AddDosage'));

function App() {
  return (
    <div className='App'>
      <Navigation />
      <ErrorBoundary>
        <React.Suspense fallback={<Spinner />}>
          <Route exact path='/' component={Landing} />
          <Route exact path='/landing' component={Landing} />
          <Route exact path='/loading' component={Loading} />
          <Route path='/user' component={UserProfile} />
          <Route path='/diary' component={Diary} />
          <Route path='/identify' component={Identify} />
          <Route path='/reminders' component={Reminders} />
          <Route path='/pills' component={PillsContainer} />
          <Route path='/adddosage' component={AddDosage} />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

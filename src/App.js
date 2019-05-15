import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Diary from './components/Diary/Diary';
import Onboard from './components/Onboard/Onboard';
import Dashboard from './components/Dashboard/Dashboard';
import PillsContainer from './components/PillsContainer/PillsContainer';
import Landing from './components/Landing/Landing';
import Loading from './components/Loading/Loading';
import ScanOrAdd from 'components/ScanOrAdd/Container.js';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary.js';
import AddDosage from 'components/AddDosage/AddDosage';
import Auth from 'Auth';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Navigation />
        <ErrorBoundary>
          <Route exact path='/' component={Home} />
          <Route exact path='/landing' component={Landing} />
          <Route exact path='/onboard' component={Onboard} />
          <Route exact path='/diary' component={Diary} />
          <Route path='/scan' component={ScanOrAdd} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route path='/pills' component={PillsContainer} />
          <Route exact path='/loading' component={Loading} />
          <Route exact path='/adddosage' component={AddDosage} />
        </ErrorBoundary>
      </header>
    </div>
  );
}

function Home() {
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  };
  return (
    <div className='homeScreen'>
      <h2>Home screen</h2>
      <button
        onClick={event => {
          event.preventDefault();
          Auth.lock.show();
        }}
      >
        Login or Register
      </button>
      {/* Logout needed for Auth0 testing, needs to be moved for production */}
      <button onClick={logOut}>Logout</button>
    </div>
  );
}

export default App;

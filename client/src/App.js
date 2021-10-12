import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppFrame from './components/AppFrame';
import LoginCard from './components/LoginCard';
import Timeline from './components/Timeline';

import './Common.css';
import './App.css';

const baseUrl = "http://localhost:3001/";

function App() {
  const [token, setToken] = useState( sessionStorage.getItem('sheepLoginToken') || localStorage.getItem('sheepLoginToken') )
  console.log('localStorage: ', localStorage.getItem('sheepLoginToken'))
  console.log('sessionStorage: ', sessionStorage.getItem('sheepLoginToken'))

  const signout = () => {
    sessionStorage.removeItem('sheepLoginToken')
    localStorage.removeItem('sheepLoginToken')
    setToken(null)
  }

  if (!token) {
    return (
      <AppFrame token={token} signout={signout} >
        <LoginCard baseUrl={baseUrl} setToken={setToken} />
      </AppFrame>
    )
  }
  return (
    <AppFrame token={token} signout={signout} >
      <Switch>
        <Route exact path="/">
          <Timeline baseUrl={baseUrl} token={token} />
        </Route>
        <Route>
          <div className="flex-center">
            <h1>404 NOT FOUND</h1>
          </div>
        </Route>
      </Switch>
    </AppFrame>
  );
}

export default App;

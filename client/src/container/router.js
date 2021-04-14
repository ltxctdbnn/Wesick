import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import MyPage from './MyPage';
import Chat from './Chat';
import Init from './Init';
import Profile from '../component/Profile';
import Navigation from '../component/Navigation';

const AppRouter = ({ isLoggedIn }) => {
    return (
      <Router>
        {isLoggedIn && <Navigation />}
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/mypage">
                <MyPage />
              </Route>
              <Route exact path="/chat" component={Chat} />
            </>
          ) : (
            <>
              <Route exact path="/">
                <Init />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    );
  };
  
  export default AppRouter;
  
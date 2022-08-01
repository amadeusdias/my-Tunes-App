import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Album from './pages/Album';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes!</p>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/*" component={ NotFound } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
      </div>
    );
  }
}

export default App;

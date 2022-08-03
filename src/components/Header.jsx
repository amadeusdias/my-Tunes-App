import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const data = await getUser();
    this.setState({
      loading: false,
      user: data.name,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="header-component">
        {loading ? <Loading /> : <h4 data-testid="header-user-name">{user}</h4> }
        <Link to="/search" data-testid="link-to-search">Search</Link>

        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>

        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </div>
    );
  }
}

export default Header;

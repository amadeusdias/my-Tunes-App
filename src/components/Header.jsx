import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  user = async () => {
    await getUser();
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <Header data-testid="header-component">
        {loading ? <Loading /> : { user } }
      </Header>
    );
  }
}

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      login: '',
      loading: false,
    };
  }

  validateButton = () => {
    const { login } = this.state;
    const TRES = 2;
    if (login.length >= TRES) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validateButton());
  }

    handleClick = async () => {
      const { login } = this.state;
      const { history } = this.props;
      this.setState({
        loading: true,
      });
      await createUser({ name: login });
      this.setState({
        loading: false,
      });
      history.push('/search');
    }

    render() {
      const { isDisabled, login, loading } = this.state;
      return (
        <div data-testid="page-login">
          {
            loading
              ? (<Loading />)
              : (
                <form>
                  <label htmlFor="login">
                    <input
                      id="login"
                      data-testid="login-name-input"
                      type="text"
                      name="login"
                      onChange={ this.handleChange }
                      value={ login }
                    />
                    <button
                      type="button"
                      data-testid="login-submit-button"
                      onClick={ this.handleClick }
                      disabled={ isDisabled }
                    >
                      {' '}
                      Entrar

                    </button>
                  </label>
                </form>
              )
          }
        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

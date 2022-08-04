import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      loading: false,
      nome: '',
      nome1: '',
      albuns: [],
      status: true,
    };
  }

  // componentDidUpdate() {
  //   const { albuns } = this.state;
  //   if (albuns.length === 0) {
  //     this.setState({ status: false });
  //   } else {
  //     this.setState({ status: true });
  //   }
  // }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validateButton());
  }

  // handleChange= (event) => {
  //   this.setState({ nome: event.target.value }, this.validateButton());
  // }

  validateButton = () => {
    const { nome } = this.state;
    const DOIS = 1;
    if (nome.length >= DOIS) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleClick= async () => {
    const { nome } = this.state;
    this.setState({
      nome1: nome,
      loading: true,
      nome: '',
    });
    const data = await searchAlbumsAPI(nome);
    this.setState({
      loading: false,
      albuns: data,
    });
    const { albuns } = this.state;
    if (albuns.length === 0) {
      this.setState({ status: false });
    }
  }

  render() {
    const { disabled, albuns, loading, nome, nome1, status } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="nome">
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Nome do artista"
              name="nome"
              id="nome"
              value={ nome }
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Pesquisar

            </button>

          </label>
        </form>
        {nome1 && <p>{`Resultado de álbuns de: ${nome1}`}</p>}
        {loading ? (<Loading />)
          : (
            albuns.map((album) => (
              <span key={ album.collectionId }>

                <p>{album.collectionName}</p>
                <img src={ album.artworkUrl100 } alt="capa" />
                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  Go to Album

                </Link>
              </span>)))}
        {status ? null : <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;

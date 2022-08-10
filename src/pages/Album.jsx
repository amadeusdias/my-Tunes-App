import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
// import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artistName: '',
      artistAlbum: '',
      // favorites: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const musicas = response.filter(({ kind }) => kind === 'song');
    this.setState({
      musics: [...musicas],
      artistName: response[0].artistName,
      artistAlbum: response[0].collectionName,
      isLoading: false,
    });
  }

  render() {
    const {
      musics,
      artistAlbum,
      artistName,
      isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <h4 data-testid="artist-name">{artistName}</h4>
            <h4 data-testid="album-name">{artistAlbum}</h4>

          </div>
        )}

        { (
          musics.map(({ trackName, previewUrl, trackId }) => (
            <section key={ trackName }>
              <MusicCard
                trackId={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />
            </section>
          )))}

      </div>
    );
  }
}

// a linha 34 possui um condicional, assim como o utilizado na page Search: se o index do elemento musica for diferente de zero ele pode ser renderizado, se o index for igual a zero ele é considerado falsy e não é renderizado. Isso é necessario pq o primeiro elemento do array musics so possui informações sobre o albúm, não tem a previewUrl que faz a musica tocar, oq tava gerando uma faixa morta na renderização do albúm.

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

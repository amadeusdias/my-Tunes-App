import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isCheked: '',
      isLoading: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { trackId } = this.props;
    console.log(trackId);
    const data = await getMusics(trackId);
    this.setState({
      isLoading: false,
      favorites: data,
    });
  }

  handleChange = async ({ target }) => {
    const { favorites } = this.state;
    this.setState({ isLoading: true });
    if (target.checked) {
      await addSong(favorites);
      this.setState({ isLoading: false, isCheked: true }, getFavoriteSongs);
    } else {
      await removeSong(favorites);
      this.setState({ isCheked: false, isLoading: false });
    }
  }

  render() {
    const { isCheked, isLoading } = this.state;
    const {
      trackName,
      previewUrl,
      trackId,
      // obj,
      // testFunction,
    } = this.props;

    return (
      <span>
        {isLoading ? <Loading /> : (
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
                checked={ isCheked }
              />
            </label>
          </div>
        )}

      </span>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  // testFunction: PropTypes.func.isRequired,
  // isCheked: PropTypes.bool.isRequired,
  // oldFavorites: PropTypes.arrayOf.isRequired,
  // songs: PropTypes.arrayOf.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // obj: PropTypes.oneOfType([
  //  PropTypes.string,
  // ]).isRequired,
};

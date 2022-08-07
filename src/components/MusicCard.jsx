import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isCheked: false,
    };
  }

  handleChange = async (obj) => {
    this.setState({ isLoading: true });
    await addSong(obj);
    this.setState({ isLoading: false, isCheked: true });
  }

  render() {
    const { trackName, previewUrl, trackId, obj } = this.props;
    const { isLoading, isCheked } = this.state;
    return (
      <span>
        {isLoading ? (<Loading />) : (
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
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                id="favorite"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ () => this.handleChange(obj) }
                checked={ isCheked }
              />
            </label>
          </div>
        ) }
      </span>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

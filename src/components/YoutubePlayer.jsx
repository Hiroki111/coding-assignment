import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import '../styles/youtubePlayers.scss';

const YoutubePlayer = ({ videoKey, onCloseModal }) => {
  return (
    <Modal
      isOpen
      className="youtube-player-modal"
      ariaHideApp={false}
    >
      <div className="video-player-wrapper">
        <ReactPlayer
          className="video-player"
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          data-testid="youtube-player"
        />
        <button className="close-button" onClick={onCloseModal}>
          CLOSE
        </button>
      </div>
    </Modal>
  );
};

export default YoutubePlayer;

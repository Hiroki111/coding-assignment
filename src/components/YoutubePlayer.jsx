import ReactPlayer from 'react-player'

const YoutubePlayer = ({ videoKey }) => (<ReactPlayer 
  className="video-player" 
  url={`https://www.youtube.com/watch?v=${videoKey}`}
  // "={true}" is redundant, if this prop has to be always true
  controls={true}
  // same here
  playing={true}
  data-testid="youtube-player"
/>);

export default YoutubePlayer;
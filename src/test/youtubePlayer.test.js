import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import YoutubePlayer from '../components/YoutubePlayer';

describe('YoutubePlayer', () => {
  it('renders the YoutubePlayer component', () => {
    render(<YoutubePlayer videoKey="your-video-key" onCloseModal={() => {}} />);

    expect(screen.getByTestId('youtube-player')).toBeInTheDocument();
    expect(screen.getByText('CLOSE')).toBeInTheDocument();
  });

  it('calls onCloseModal when CLOSE button is clicked', () => {
    const onCloseModalMock = jest.fn();
    render(<YoutubePlayer videoKey="your-video-key" onCloseModal={onCloseModalMock} />);

    fireEvent.click(screen.getByText('CLOSE'));

    expect(onCloseModalMock).toHaveBeenCalled();
  });
});

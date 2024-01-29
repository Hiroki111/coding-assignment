import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import YoutubePlayer from '../components/YoutubePlayer';

describe('YoutubePlayer', () => {
  it('renders the YoutubePlayer component', async () => {
    await act(async () => render(<YoutubePlayer videoKey="your-video-key" onCloseModal={() => {}} />));

    expect(screen.getByTestId('youtube-player')).toBeInTheDocument();
    expect(screen.getByText('CLOSE')).toBeInTheDocument();
  });

  it('calls onCloseModal when CLOSE button is clicked', async () => {
    const onCloseModalMock = jest.fn();
    await act(async () => render(<YoutubePlayer videoKey="your-video-key" onCloseModal={onCloseModalMock} />));

    fireEvent.click(screen.getByText('CLOSE'));

    expect(onCloseModalMock).toHaveBeenCalled();
  });
});

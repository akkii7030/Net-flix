import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';


const VideoBackground = ({ movieId }) => {
  //fetch tailer video && updating the store with trailer  video data
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black text-white">
      {/* Video Section */}
      <div className="w-full h-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1`} // Remove space after the key
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

      </div>
    </div>
  )
}

export default VideoBackground

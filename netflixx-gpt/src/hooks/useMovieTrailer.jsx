import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constent";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideo = async () => {
    try {
      console.log("Fetching movie trailer for movieId:", movieId);
      
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Fetched movie trailer data:", json);

      if (!json.results || json.results.length === 0) {
        console.log("No trailers found for this movie.");
        dispatch(addTrailerVideo(null)); // Ensure Redux updates with null
        return;
      }

      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];

      console.log("Selected trailer:", trailer);

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMovieVideo();
    }
  }, [movieId]); // ✅ Added dependency to re-fetch when movieId changes
};

export default useMovieTrailer;

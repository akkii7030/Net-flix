import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constent";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  // Define the async function properly
  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      dispatch(addNowPlayingMovies(json.results)); // Dispatch action correctly
    } catch (error) {
      console.error("Fetching movies failed", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, [dispatch]); // Add dispatch to dependency array

};

export default useNowPlayingMovies;

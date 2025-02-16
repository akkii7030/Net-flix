import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constent";
import { useEffect } from "react";
import {  addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  // Define the async function properly
  const getPopularMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      dispatch(addPopularMovies(json.results)); // Dispatch action correctly
    } catch (error) {
      console.error("Fetching movies failed", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, [dispatch]); // Add dispatch to dependency array

};

export default usePopularMovies;

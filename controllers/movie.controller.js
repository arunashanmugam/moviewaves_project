

import { fetchFromTMDB, saveMovie, getMovies } from "../services/tdmb.service.js";
import dotenv from 'dotenv';
dotenv.config();


export const getTrendingMovies = async (req, res) => {
  try {
    
    const url = "https://api.themoviedb.org/3/trending/movie/day";

    
    const data = await fetchFromTMDB(url);

    
    if (!data || !data.results || data.results.length === 0) {
      return res.status(404).json({ success: false, message: "No trending movies found." });
    }

    
    const savedMovies = await Promise.all(
      data.results.map(async (movie) => {
        try {
          return await saveMovie(movie);
        } catch (saveError) {
          console.error("Error saving movie:", saveError.message);
          return null;
        }
      })
    );

    
    const successfulMovies = savedMovies.filter(movie => movie !== null);

    if (successfulMovies.length === 0) {
      return res.status(500).json({ success: false, message: "Failed to save movies to the database." });
    }

  
    const randomMovie = successfulMovies[Math.floor(Math.random() * successfulMovies.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("Error in trending movies controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error in trending movies controller.",
    });
  }
};


export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

    
    const data = await fetchFromTMDB(url);

    if (!data || !data.results) {
      return res.status(404).json({ success: false, message: "No trailers found." });
    }

    res.json({ success: true, trailers: data.results });
  } catch (error) {
    console.error("Error in fetching movie trailers:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching movie trailers.",
    });
  }
};


export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
   
    const url = `https://api.themoviedb.org/3/movie/${id}`;

   
    const data = await fetchFromTMDB(url);

    if (!data) {
      return res.status(404).json({ success: false, message: "Movie not found." });
    }

    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.error("Error in fetching movie details:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error in movie details controller.",
    });
  }
};


export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    
    const url = `https://api.themoviedb.org/3/movie/${id}/similar`;

   
    const data = await fetchFromTMDB(url);

    if (!data || !data.results) {
      return res.status(404).json({ success: false, message: "No similar movies found." });
    }

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error in fetching similar movies:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error in similar movies controller.",
    });
  }
};


export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    
    const url = `https://api.themoviedb.org/3/movie/${category}`;

    
    const data = await fetchFromTMDB(url);

    if (!data || !data.results) {
      return res.status(404).json({ success: false, message: "No movies found for this category." });
    }

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error in getting movies by category:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error in getting movies by category controller.",
    });
  }
};




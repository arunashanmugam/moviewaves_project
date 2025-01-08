

import { PrismaClient } from "@prisma/client";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();


const prisma = new PrismaClient();

import axiosRetry from "axios-retry";


axiosRetry(axios, {
  retries: 3, 
  retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error),
  retryDelay: (retryCount) => retryCount * 2000, 
});


export const fetchFromTMDB = async (url,params={} ) => {
  try {
    const options = {
      params,  
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      timeout: 30000, 
    };

    const response = await axios.get(url, options);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching from TMDB:", error.response?.data || error.message);
    throw new Error("Error fetching data from TMDB");
  }
};



export const saveMovie = async (movieData) => {
  try {
    const movie = await prisma.movie.create({
      data: {
        title: movieData.title,
        overview: movieData.overview,
        releaseDate: new Date(movieData.release_date),
        posterPath: movieData.poster_path
          ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
          : null, 
      },
    });
    return movie;
  } catch (error) {
    console.error("Error saving movie to database:", error.message);
    throw new Error("Error saving movie to database");
  }
};


export const getMovies = async () => {
  try {
    const movies = await prisma.movie.findMany();
    return movies;
  } catch (error) {
    console.error("Error fetching movies from database:", error.message);
    throw new Error("Error fetching movies from database");
  }
};

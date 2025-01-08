import express from "express";
import {
  getSimilarTvShows,
  getTrendingTV,
  getTvShowDetails,
  getTvShowTrailer,
  getTvShowsByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTvShowTrailer);
router.get("/:id/details", getTvShowDetails);
router.get("/:id/similar", getSimilarTvShows);
router.get('/:category', getTvShowsByCategory);


export default router;



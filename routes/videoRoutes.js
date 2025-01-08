

import express from "express";
import { addVideo,getVideos ,deleteVideo,updateVideo} from "../controllers/videoController.js";

const router = express.Router();


router.post("/add", addVideo);

router.get("/", getVideos);

router.put("/:id", updateVideo);

router.delete("/:id", deleteVideo);

export default router;



import prisma from "../models/prismaClient.js";


export const addVideo = async (req, res) => {
  try {
    const { movieName, imageUrl, videoUrl } = req.body;

    
    if (!movieName || !imageUrl || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields (movieName, imageUrl, videoUrl) are required.",
      });
    }

    
    const newVideo = await prisma.video.create({
      data: {
        movieName,
        imageUrl,
        videoUrl,
        adminId: 1,
      },
    });

    res.status(201).json({
      success: true,
      message: "Video Added Successfully....",
      data: newVideo,
    });
  } catch (error) {
    console.error("Error while adding video:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany();

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Video ID is required.",
      });
    }

    await prisma.video.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: "Video deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting video:", error.message);
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, message: "Video not found." });
    }
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { movieName, imageUrl, videoUrl } = req.body;

    if (!id || (!movieName && !imageUrl && !videoUrl)) {
      return res.status(400).json({
        success: false,
        message: "Video ID and at least one field (movieName, imageUrl, videoUrl) are required.",
      });
    }

    const updatedVideo = await prisma.video.update({
      where: { id: parseInt(id) },
      data: { movieName, imageUrl, videoUrl },
    });

    res.status(200).json({
      success: true,
      message: "Video updated successfully.",
      data: updatedVideo,
    });
  } catch (error) {
    console.error("Error updating video:", error.message);
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, message: "Video not found." });
    }
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};



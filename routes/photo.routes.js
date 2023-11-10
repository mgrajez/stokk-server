// const express = require("express");
const router = require("express").Router();
const Photo = require("../models/Photo.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");
const fileUploader = require("../config/cloudinary.config");

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

// Creating a new photo

router.post("/", isAuthenticated, (req, res, next) => {
  Photo.create({
    photoUrl: req.body.photoUrl,
    userId: req.payload._id,
    photoDescription: req.body.photoDescription,
    photoWidth: req.body.photoWidth,
    photoHeight: req.body.photoHeight,
    portfolioUrl: req.body.portfolioUrl,
  })
    .then((createdPhoto) => {
      res.status(201).json(createdPhoto);
    })
    .catch((error) => {
      next(error);
    });
});

// Getting all photos

router.get("/", (req, res, next) => {
  Photo.find()
    .then((allPhotos) => {
      res.status(200).json(allPhotos);
    })
    .catch((error) => {
      next(error);
    });
});

// Getting a specific photo

router.get("/:photoId", (req, res, next) => {
  Photo.findById(req.params.photoId)
    .then((photo) => {
      res.status(200).json(photo);
    })
    .catch((error) => {
      next(error);
    });
});

// Updating a photo

router.put("/:photoId", isAuthenticated, (req, res, next) => {
  const photoId = req.params.photoId;
  Photo.findOneAndUpdate({ _id: photoId, userId: req.payload._id }, req.body, {
    new: true,
  })
    .then((updatedPhoto) => {
      res.status(200).json(updatedPhoto);
    })
    .catch((error) => {
      next(error);
    });
});

// Deleting the photo

router.delete("/:photoId", isAuthenticated, (req, res, next) => {
  const photoId = req.params.photoId;
  Photo.findOneAndDelete({ _id: photoId, userId: req.payload._id })
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

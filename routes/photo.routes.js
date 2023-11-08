const router = require("express").Router();
const Photo = require("../models/Photo.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

// Creating a new photo

router.post("/", isAuthenticated, (req, res, next) => {
  Photo.create({
    photoUrl: req.body.photoUrl,
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
  Photo.findByIdAndUpdate(req.params.photoId, req.body, { new: true })
    .then((updatedPhoto) => {
      res.status(200).json(updatedPhoto);
    })
    .catch((error) => {
      next(error);
    });
});

// Deleting the photo

router.delete("/:photoId", isAuthenticated, (req, res, next) => {
  Photo.findByIdAndDelete(req.params.photoId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

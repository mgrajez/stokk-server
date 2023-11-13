const router = require("express").Router();
const Photo = require("../models/Photo.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");
const fileUploader = require("../config/cloudinary.config");

// Creating a new photo

router.post(
  "/",
  isAuthenticated,
  fileUploader.single("url"),

  (req, res, next) => {
    console.log(req.file);
    Photo.create({
      url: req.file.path,
      userId: req.payload._id,
      description: req.body.description,
      width: req.body.width,
      height: req.body.height,
      portfolioUrl: req.body.portfolioUrl,
    })
      .then((createdPhoto) => {
        res.status(201).json(createdPhoto);
      })
      .catch((error) => {
        next(error);
      });
  }
);

// Getting photos of the specific user
router.get("/mine", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  console.log("userId", userId);
  console.log("hi monika");
  Photo.find({ userId })
    .then((userPhotos) => {
      res.status(200).json(userPhotos);
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
router.delete("/:photoId", isAuthenticated, async (req, res, next) => {
  const photoId = req.params.photoId;

  try {
    const deletedPhoto = await Photo.deleteOne({
      _id: photoId,
      userId: req.payload._id,
    });

    if (deletedPhoto.deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Photo not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

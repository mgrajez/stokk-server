const router = require("express").Router();
const Favorite = require("../models/Favorite.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Getting all favorite photos

router.get("/", isAuthenticated, (req, res, next) => {
  Favorite.find({ userId: req.payload._id })
    .populate("photoId")
    .then((allFavorites) => {
      res.status(200).json(allFavorites);
    })
    .catch((error) => {
      next(error);
    });
});

// Creating a favorite photo

// router.post("/:photoId", isAuthenticated, (req, res, next) => {
//   Favorite.create({
//     photoId: req.params.photoId,
//     userId: req.payload._id,
//   })
//     .then((createdFavorite) => {
//       res.status(201).json(createdFavorite);
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

router.post("/:photoId", isAuthenticated, async (req, res, next) => {
  try {
    const createdFavorite = await Favorite.create({
      photoId: req.params.photoId,
      userId: req.payload._id,
    });
    res.status(201).json(createdFavorite);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Photo is already in favorites" });
    } else {
      next(error);
    }
  }
});

// Deleting the favorite photo

router.delete("/:photoId", isAuthenticated, (req, res, next) => {
  const photoId = req.params.photoId;
  Favorite.findOneAndDelete({ photoId: photoId, userId: req.payload._id })
    .then((deletedFavorite) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

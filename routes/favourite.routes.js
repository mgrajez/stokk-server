const router = require("express").Router();
const Favourite = require("../models/Favourite.model");

// Getting all favourite photos

router.get("/", (req, res, next) => {
  Favourite.find()
    .then((allFavourites) => {
      res.status(200).json(allFavourites);
    })
    .catch((error) => {
      next(error);
    });
});

// Creating a favourite photo

router.post("/:photoId", (req, res, next) => {
  Favourite.create({
    photoId: req.body.photoUrl,
    userId: req.body.username,
  })
    .then((createdFavourite) => {
      res.status(201).json(createdFavourite);
    })
    .catch((error) => {
      next(error);
    });
});

// Deleting the favourite photo

router.delete("/:favouriteId", (req, res, next) => {
  Favourite.findByIdAndDelete(req.params.favouriteId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

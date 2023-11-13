// const router = require("express").Router();
// const Photo = require("../models/Photo.model");
// const { isAuthenticated } = require("./../middleware/jwt.middleware");

// // Getting photos uploaded by a specific user
// router.get("/photos/:userId", isAuthenticated, async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const userPhotos = await Photo.find({ userId: req.payload._id });

//     res.status(200).json(userPhotos);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));
router.use("/photos", require("./photo.routes"));
router.use("/favorites", require("./favorite.routes"));

module.exports = router;

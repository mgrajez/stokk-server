const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema({
  photoId: { type: Schema.Types.ObjectId, ref: "Photo" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Favourite = model("Favourite", favouriteSchema);

module.exports = Favourite;

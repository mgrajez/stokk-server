const { Schema, model } = require("mongoose");

const photoSchema = new Schema({
  photoUrl: { type: String, required: true },
  photoDescription: { type: String, required: true },
  photoWidth: { type: Number, required: true },
  photoHeight: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  portfolioUrl: String,
});

const Photo = model("Photo", photoSchema);

module.exports = Photo;

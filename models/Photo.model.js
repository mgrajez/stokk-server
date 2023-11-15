// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const photoSchema = new Schema({
  url: { type: String, required: true },
  description: { type: String, required: true, index: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  portfolioUrl: String,
});

const Photo = model("Photo", photoSchema);

module.exports = Photo;

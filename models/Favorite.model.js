const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema(
  {
    photoId: { type: Schema.Types.ObjectId, ref: "Photo", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Making a fav photo unique
favoriteSchema.index({ photoId: 1, userId: 1 }, { unique: true });

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;

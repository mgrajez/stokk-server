const axios = require("axios");
require("dotenv").config();
require("./../db");
const Photo = require("./../models/Photo.model");

async function seed() {
  try {
    const { data } = await axios.get(
      "https://api.unsplash.com/photos?client_id=5sQSacApgIgY_MjiEdBJH9KduzIIFtBq5ZB_jpfQHwc"
    );
    for (const pic of data) {
      const photo = {
        url: pic.urls.regular,
        description: pic.alt_description || pic.description,
        width: pic.width,
        height: pic.height,
        userId: "654e0845d8923e3640aa374f",
        portfolioUrl: pic.user.portfolio_url || "Not added yet",
      };
      Photo.create(photo);
    }
  } catch (error) {
    console.log(error);
  }
}

seed();

// Protecting routes
const { expressjwt: jwt } = require("express-jwt");

// Creating isAuthenticated middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function to see if request headers contain an "Authorization" header
function getTokenFromHeaders(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

// Exporting the middleware to create protected routes
module.exports = {
  isAuthenticated,
};

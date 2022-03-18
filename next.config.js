require("dotenv").config();

module.exports = {
  
  reactStrictMode: true,
  env: {
    REACT_APP_API_KEY:process.env.REACT_APP_API_KEY,
  },
  images: {
    domains: ["openweathermap.org"],
  },
};

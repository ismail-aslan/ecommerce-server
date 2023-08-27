module.exports = {
  servers: [
    {
      url: process.env.BASE_URL + "api/v1",
      description: process.env.NODE_ENV + " server",
    },
  ],
};

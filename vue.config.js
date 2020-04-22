module.exports = {
  devServer: {
    proxy: {
      "^/api/": {
        target: "http://localhost:9000",
        ws: true,
        secure: false
      }
    }
  }
};

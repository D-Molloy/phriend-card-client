module.exports = {
  devServer: {
    // hot: false,
    liveReload: false,
    proxy: "http://localhost:8081"
  },
  transpileDependencies: ["vuetify"]
};

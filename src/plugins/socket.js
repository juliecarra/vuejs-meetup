import io from "socket.io-client";

const MySocketPlugin = {
  install(Vue, options) {
    // Instance method
    Vue.prototype.$socket = io(options.connection);
  },
};

export default MySocketPlugin;

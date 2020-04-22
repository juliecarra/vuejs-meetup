import Vue from "vue";
import Vuelidate from "vuelidate";
import Toasted from "vue-toasted";
import MySocketPlugin from "./plugins/socket";
import App from "./App.vue";
import AppDropdown from "./components/shared/AppDropdown";
import AppHero from "./components/shared/AppHero";
import AppSpinner from "./components/shared/AppSpinner.vue";
import router from "./router/router";
import store from "./store";

import moment from "moment";

Vue.config.productionTip = false;

Vue.component("AppHero", AppHero);
Vue.component("AppDropdown", AppDropdown);
Vue.component("AppSpinner", AppSpinner);

Vue.use(Vuelidate);
Vue.use(Toasted);
Vue.use(MySocketPlugin, { connection: "http://localhost:9000" });

// Capitalize first letter of the word
Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

//format the date
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("lll");
  }
});

Vue.filter("formatDate2", function(value, formatType = "LL") {
  if (!value) return "";

  return moment(value).format(formatType);
});

Vue.filter("fromNow", function(value) {
  if (!value) return "";

  return moment(value).fromNow();
});

new Vue({
  router,
  store,
  Vuelidate,

  render: (h) => h(App),
}).$mount("#app");

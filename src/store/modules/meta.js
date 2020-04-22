import axios from "axios";

export default {
  namespaced: true,

  state: {
    isLocationResolved: false,
    item: {
      city: "",
      country: ""
    }
  },
  getters: {
    location(state) {
      const { city, country } = state.item;
      return city && country ? city + ", " + country : "";
    }
  },
  actions: {
    fetchMetaData({ commit }) {
      return axios
        .get("/api/ip")
        .then(response => {
          const meta = response.data;
          commit("setItem", { item: meta, resource: "meta" }, { root: true });
          commit("resolveLocation", true);
          return meta;
        })
        .catch(error => {
          commit("resolveLocation", true);
          return error;
        });
    }
  },
  mutations: {
    resolveLocation(state, isLocationResolved) {
      state.isLocationResolved = isLocationResolved;
    }
  }
};

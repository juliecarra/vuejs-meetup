import axios from "axios";

export default {
  namespaced: true,
  state: { items: [] },
  getters: {},
  actions: {
    fetchCategories({ state, commit }) {
      return axios
        .get("/api/categories")
        .then(response => {
          const categories = response.data;
          //   commit("setCategories", categories);
          commit(
            "setItems",
            { resource: "categories", items: categories },
            { root: true }
          );
          return state.items;
        })
        .catch(error => console.log(error));
    }
  },
  mutations: {}
};

import axios from "axios";

export default {
  namespaced: true,
  state: {
    meetups: {
      data: [],
      count: null,
    },
    threads: {
      data: [],
      count: null,
    },
    posts: {
      data: [],
      count: null,
    },
  },
  actions: {
    fetchUserStats({ commit }) {
      return axios.get("/api/users/me/activity").then((response) => {
        const stats = response.data;
        commit("setStats", stats);
        return stats;
      });
    },
  },
  mutations: {
    setStats(state, stats) {
      return Object.assign(state, {}, stats);
    },
  },
};

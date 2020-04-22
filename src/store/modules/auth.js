import axios from "axios";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    user: null,

    isAuthResolved: false,
  },
  getters: {
    currentUser(state) {
      return state.user || null;
    },

    isAuthenticated(state) {
      return !!state.user;
    },

    isOwner: (state) => (meetupCreatorId) => {
      if (!state.user) return false;
      else return state.user._id === meetupCreatorId;
    },

    isMember: (state) => (meetupId) => {
      return (
        state.user &&
        state.user["joinedMeetups"] &&
        state.user["joinedMeetups"].includes(meetupId)
      );
    },
  },
  actions: {
    loginWithEmailAndPassword({ commit }, userData) {
      return axios.post("/api/users/login", userData).then((response) => {
        const user = response.data;
        commit("setAuthUser", user);
      });
    },

    registerUser(context, userData) {
      return axios.post("/api/users/register", userData);
    },

    getCurrentUser({ commit, getters }) {
      //so that we don't call the api all the time
      const currentUser = getters["currentUser"];
      if (currentUser) return Promise.resolve(currentUser);

      const config = {
        headers: {
          "Cache-Control": "no-cache",
        },
      };
      return axios
        .get("/api/users/me", config)
        .then((response) => {
          const user = response.data;
          commit("setAuthUser", user);
          commit("setAuthResolved", true);
          return user;
        })
        .catch((error) => {
          commit("setAuthUser", null);
          commit("setAuthResolved", true);
          return error;
        });
    },

    logout({ commit }) {
      return axios
        .post("/api/users/logout")
        .then(() => {
          commit("setAuthUser", null);
          return true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addMeetupToAuthUser({ commit, state }, meetupId) {
      // Get the meetup joined by the user
      const userMeetups = [...state.user["joinedMeetups"], meetupId];
      commit("setMeetupsToAuthUser", userMeetups);
    },
    removeMeetupFromAuthUser({ commit, state }, meetupId) {
      const userMeetupsIds = [...state.user["joinedMeetups"]];
      const index = userMeetupsIds.findIndex(
        (userMeetupId) => userMeetupId === meetupId
      );

      userMeetupsIds.splice(index, 1);
      commit("setMeetupsToAuthUser", userMeetupsIds);
    },
    updateUser({ commit }, user) {
      return axios.patch(`/api/users/${user._id}`, user).then((response) => {
        const updatedUser = response.data;
        commit("setAuthUser", updatedUser);
        return updatedUser;
      });
    },
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user;
    },

    setAuthResolved(state, isAuthResolved) {
      state.isAuthResolved = isAuthResolved;
    },

    setMeetupsToAuthUser(state, meetups) {
      Vue.set(state.user, "joinedMeetups", meetups);
    },
  },
};

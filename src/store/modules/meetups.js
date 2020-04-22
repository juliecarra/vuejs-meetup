import axios from "axios";
import Vue from "vue";
import { applyFilters } from "../../helpers/";

export default {
  namespaced: true,
  state: {
    items: [],
    item: {},
  },
  // Like computed properties. Simple functions that gets the state.
  getters: {},
  // Like methods. Here, we can fetch the datas
  actions: {
    fetchMeetups({ state, commit }, options = {}) {
      commit("setItems", { resource: "meetups", items: [] }, { root: true });

      const url = applyFilters("/api/meetups", options.filter);
      return axios
        .get(url)
        .then((response) => {
          const meetups = response.data;
          //   commit("setMeetups", meetups);
          commit(
            "setItems",
            { resource: "meetups", items: meetups },
            { root: true }
          );
          return state.items;
        })
        .catch((error) => console.log(error));
    },

    fetchMeetup({ state, commit }, meetupId) {
      // Reset state so that we don't have the previous infos displayed
      commit("setItem", { resource: "meetups", item: {} }, { root: true });
      return axios
        .get(`/api/meetups/${meetupId}`)
        .then((response) => {
          const meetup = response.data;
          //  commit("setMeetup", meetup);
          commit(
            "setItem",
            { resource: "meetups", item: meetup },
            { root: true }
          );
          return state.item;
        })
        .catch((error) => console.log(error));
    },

    createMeetup({ rootState }, meetup) {
      meetup.meetupCreator = rootState.auth.user;
      meetup.processedLocation = meetup.location
        .toLowerCase()
        .replace(/[\s,]+/g, "")
        .trim();

      return axios
        .post("/api/meetups", meetup)
        .then((response) => response.data)
        .catch((error) => console.log(error));
    },
    joinMeetup({ state, rootState, commit, dispatch }, meetupId) {
      // Get user who wants to join the meetup group
      const user = rootState.auth.user;

      return axios.post(`/api/meetups/${meetupId}/join`).then(() => {
        // Add meetup to authenticated user
        dispatch("auth/addMeetupToAuthUser", meetupId, { root: true });

        const joinedPeople = state.item.joinedPeople;
        commit("addUserToMeetup", [...joinedPeople, user]);
        return true;
      });
    },
    leaveMeetup({ state, rootState, commit, dispatch }, meetupId) {
      const user = rootState.auth.user;

      return axios.post(`/api/meetups/${meetupId}/leave`).then(() => {
        dispatch("auth/removeMeetupFromAuthUser", meetupId, { root: true });

        const joinedPeople = state.item.joinedPeople;
        const index = joinedPeople.findIndex((jUser) => jUser._id === user._id);
        joinedPeople.splice(index, 1);
        commit("addUserToMeetup", joinedPeople);
      });
    },

    updateMeetup({ commit, state }, meetupData) {
      meetupData.processedLocation = meetupData.location
        .toLowerCase()
        .replace(/[\s,]+/g, "")
        .trim();
      return axios
        .patch(`/api/meetups/${meetupData._id}`, meetupData)
        .then((response) => {
          const updatedMeetup = response.data;
          commit("mergeMeetup", updatedMeetup);
          return state.item;
        });
    },
  },

  mutations: {
    addUserToMeetup(state, joinedPeople) {
      // Assign to joined people the new people who joined the meetup
      Vue.set(state.item, "joinedPeople", joinedPeople);
    },
    mergeMeetup(state, updatedMeetup) {
      state.item = { ...state.item, ...updatedMeetup };
    },
  },
};

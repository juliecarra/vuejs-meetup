import Vue from "vue";
import Vuex from "vuex";

import categories from "./modules/categories";
import meetups from "./modules/meetups";
import threads from "./modules/threads";
import auth from "./modules/auth";
import stats from "./modules/stats";
import meta from "./modules/meta";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories,
    meetups,
    threads,
    auth,
    stats,
    meta
  },

  // Simple function to mutate the state
  mutations: {
    // To replace setCategories, setMeetups, setThreads...
    setItems(state, { resource, items }) {
      state[resource].items = items;
    },

    // To replace setMeetup
    setItem(state, { resource, item }) {
      state[resource].item = item;
    },
    addItemToArray(state, { item, index, resource }) {
      Vue.set(state[resource].items, index, item);
    }

    //     setCategories(state, categories) {
    //       state.categories = categories;
    //     },

    //     setMeetups(state, meetups) {
    //       state.meetups = meetups;
    //     },

    //     setMeetup(state, meetup) {
    //       state.meetup = meetup;
    //     },

    //     setThreads(state, threads) {
    //       state.threads = threads;
    //     }
  }
});

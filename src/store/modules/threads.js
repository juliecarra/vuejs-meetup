import Vue from "vue";
import axios from "axios";
import { applyFilters } from "../../helpers/";

export default {
  namespaced: true,
  state: {
    isAllThreadsLoaded: false,
    items: []
  },
  getters: {},

  actions: {
    fetchThreads({ state, commit }, { meetupId, filter = {}, init }) {
      if (init) {
        commit("setItems", { resource: "threads", items: [] }, { root: true });
      }
      const url = applyFilters(`/api/threads?meetupId=${meetupId}`, filter);
      return axios
        .get(url)
        .then(response => {
          const { threads, isAllDataLoaded } = response.data;
          commit("setAllDataLoaded", isAllDataLoaded);
          commit("mergeThreads", threads);
          // commit("setThreads", threads);
          //root: true is because mutations are in index.js
          // commit(
          //   "setItems",
          //   { resource: "threads", items: threads },
          //   { root: true }
          // );
          return state.items;
        })
        .catch(error => console.log(error));
    },

    addThread({ state, commit }, { title, meetupId }) {
      const thread = {};
      thread.title = title;
      thread.meetup = meetupId;

      console.log(title, meetupId);
      return axios.post("/api/threads", thread).then(response => {
        const createdThread = response.data;
        const index = state.items.length;

        commit(
          "addItemToArray",
          { item: createdThread, index, resource: "threads" },
          { root: true }
        );

        return createdThread;
      });
    },
    sendPost({ dispatch }, { text, threadId }) {
      const post = { text, thread: threadId };
      return axios.post("/api/posts", post).then(response => {
        const createdPost = response.data;
        dispatch("addPostToThread", { post: createdPost, threadId });
        return createdPost;
      });
    },
    addPostToThread({ commit, state }, { post, threadId }) {
      const threadIndex = state.items.findIndex(
        thread => thread._id === threadId
      );

      if (threadIndex > -1) {
        const posts = state.items[threadIndex].posts;
        posts.unshift(post);
        commit("savePostToThread", { posts, index: threadIndex });
      }
    }
  },

  mutations: {
    savePostToThread(state, { posts, index }) {
      Vue.set(state.items[index], "posts", posts);
    },

    setAllDataLoaded(state, isAllDataLoaded) {
      state.isAllThreadsLoaded = isAllDataLoaded;
    },
    mergeThreads(state, threads) {
      state.items = [...state.items, ...threads];
    }
  }
};

import Vue from "vue";
import Router from "vue-router";
import PageHome from "@/pages/PageHome.vue";
import PageMeetupDetail from "@/pages/PageMeetupDetail.vue";
import PageMeetupFind from "@/pages/PageMeetupFind.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import PageRegister from "@/pages/PageRegister.vue";
import PageLogin from "@/pages/PageLogin.vue";
import PageProfile from "@/pages/PageProfile.vue";
import PageSecret from "@/pages/PageSecret.vue";
import PageNotAuthenticated from "@/pages/PageNotAuthenticated.vue";
import PageMeetupCreate from "@/pages/PageMeetupCreate.vue";
import PageMeetupEdit from "@/pages/PageMeetupEdit";

import store from "../store";

Vue.use(Router);

const router = new Router({
  //so that # symbols doesn't appear in link
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "PageHome",
      component: PageHome,
    },
    {
      path: "/meetups/:id",
      name: "PageMeetupDetail",
      component: PageMeetupDetail,
    },
    {
      path: "/meetups/:meetupId/edit",
      name: "PageMeetupEdit",
      component: PageMeetupEdit,
      meta: { isLoggedIn: true },
      props: true,
    },
    {
      path: "/find",
      name: "PageMeetupFind",
      component: PageMeetupFind,
    },
    {
      path: "/find/:category",
      name: "PageMeetupFindCategory",
      component: PageMeetupFind,
      props: true,
    },
    {
      path: "/register",
      name: "PageRegister",
      component: PageRegister,
      meta: { isGuest: true },
    },
    {
      path: "/login",
      name: "PageLogin",
      component: PageLogin,
      meta: { isGuest: true },
    },
    {
      path: "/me",
      name: "PageProfile",
      component: PageProfile,
      meta: { isLoggedIn: true },
    },
    {
      path: "/secret",
      name: "PageSecret",
      component: PageSecret,
      meta: { isLoggedIn: true },
    },
    {
      path: "/meetup/create",
      name: "PageMeetupCreate",
      component: PageMeetupCreate,
      meta: { isLoggedIn: true },
    },
    {
      path: "/401",
      name: "PageNotAuthenticated",
      component: PageNotAuthenticated,
    },
    {
      path: "*",
      name: "PageNotFound",
      component: PageNotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  store.dispatch("auth/getCurrentUser").then(() => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];

    //To see secret page
    if (to.meta.isLoggedIn) {
      if (isAuthenticated) {
        next();
      } else {
        next({ name: "PageNotAuthenticated" });
      }
      //To be unable to see login and register if we are logged in
    } else if (to.meta.isGuest) {
      if (isAuthenticated) {
        next({ name: "PageHome" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;

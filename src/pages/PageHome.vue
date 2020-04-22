<template>
  <div v-if="isDataLoaded">
    <AppHero />
    <div class="container">
      <section class="section">
        <div class="m-b-lg">
          <h1 class="title is-inline" :style="{'color': '#212121', 'font-size': '20px'}">
            Featured Meetups
            <span v-if="ipLocation">in {{ipLocation}}</span>
          </h1>

          <router-link
            v-if="currentUser"
            :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '600' }"
            to="/meetup/create"
            class="button is-primary is-pulled-right m-r-sm"
          >Create A Meetup</router-link>
          <router-link
            to="/find"
            class="button is-pulled-right m-r-sm"
            :style="{ 'background-color': '#ff1154', 'color': 'white', 'font-weight': '600' }"
          >See all</router-link>
        </div>
        <div class="row columns is-multiline">
          <MeetupItem v-for="meetup in meetups" :key="meetup._id" :meetup="meetup" />
        </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title-category">Categories</h1>
          <h2 class="title-h2">Browse groups by topics you're interested in.</h2>
          <br />
          <div class="columns cover is-multiline is-mobile">
            <CategoryItem v-for="category in categories" :key="category._id" :category="category" />
          </div>
        </div>
      </section>
    </div>
  </div>
  <div v-else>
    <AppSpinner />
  </div>
</template>

<script>
import { processLocation } from "@/helpers";
import { mapActions, mapState, mapGetters } from "vuex";
import CategoryItem from "@/components/CategoryItem";
import MeetupItem from "@/components/MeetupItem";
export default {
  components: { CategoryItem, MeetupItem },

  data() {
    return {
      isDataLoaded: false
    };
  },

  computed: {
    ...mapState({
      categories: state => state.categories.items,
      meetups: state => state.meetups.items
    }),
    ...mapGetters({
      currentUser: "auth/currentUser",
      // ipLocation: "meta/location"
      ipLocation: null
    })
  },

  methods: {
    ...mapActions("categories", ["fetchCategories"]),
    // 'meetups' specifies in which module actions are
    ...mapActions("meetups", ["fetchMeetups"])
  },
  created() {
    const filter = {};
    if (this.ipLocation) {
      filter["location"] = processLocation(this.ipLocation);
    }
    // Call actions from store

    Promise.all([this.fetchCategories(), this.fetchMeetups({ filter })])
      .then(response => {
        this.isDataLoaded = true;
      })
      .catch(error => console.log(error), (this.isDataLoaded = true));
  }
};
</script>

<style scoped>
.title-category {
  color: #212121;
  font-size: 20px;
  font-family: Graphik Meetup, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, Arial, sans-serif;
  font-weight: bolder;
}

.title-h2 {
  color: #212121;
  font-family: Graphik Meetup, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, Arial, sans-serif;
}
</style>

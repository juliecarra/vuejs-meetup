<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <!-- <h1 class="title is-4">Meetup</h1> -->
        <img src="/icon.png" alt="meetup" :style="{ 'max-height': '50px' }" />
      </router-link>
      <a role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="currentUser" :style="{  'color': '#212121' }">Welcome {{currentUser.username}}</div>
        </div>
        <div
          v-if="currentUser"
          class="navbar-item has-dropdown is-hoverable"
          :style="{  'color': '#212121' }"
        >
          <a class="navbar-link" :style="{  'color': '#212121' }">Account</a>
          <div class="navbar-dropdown">
            <router-link
              :to="{name: 'PageProfile'}"
              class="navbar-item"
              :style="{  'color': '#212121' }"
            >Profile</router-link>
            <hr class="navbar-divider" />
            <a
              class="navbar-item"
              v-on:click.prevent="onSubmit"
              :style="{  'color': '#212121' }"
            >Logout</a>
          </div>
        </div>
        <div v-else class="navbar-item has-dropdown">
          <div class="buttons">
            <router-link
              :to="{name: 'PageRegister'}"
              class="button"
              :style="{ 'background-color': '#ff1154', 'color': 'white' }"
            >
              <strong>Sign up</strong>
            </router-link>
            <router-link
              :to="{name: 'PageLogin'}"
              class="button"
              :style="{ 'background-color': 'white', 'color': '#ff1154' }"
            >Log in</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      currentUser: "auth/currentUser"
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("auth/logout")
        .then(() => this.$router.push("/"))
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
</style>

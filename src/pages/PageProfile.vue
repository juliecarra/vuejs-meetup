<template>
  <div class="columns">
    <div class="container profile">
      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <figure class="image header-icon user-profile-image">
              <img class="is-rounded" :src="currentUser.avatar" />
            </figure>
          </div>
          <div class="column is-4-tablet is-10-mobile name">
            <p>
              <span class="title is-bold">{{currentUser.name}}</span>
              <br />

              <UserUpdateModal :authUser="currentUser" @userSubmitted="updateUser" />
              <br />
            </p>

            <p class="tagline">{{currentUser.infos}}</p>
          </div>

          <div
            @click="activeTab = 'meetups'"
            :class="{isActive: activeTab === 'meetups'}"
            class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
          >
            <p class="stat-val">{{meetupCount}}</p>
            <p class="stat-key">Meetups</p>
          </div>

          <div
            @click="activeTab = 'threads'"
            :class="{isActive: activeTab === 'threads'}"
            class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
          >
            <p class="stat-val">{{threadCount}}</p>
            <p class="stat-key">Threads</p>
          </div>

          <div
            @click="activeTab = 'posts'"
            :class="{isActive: activeTab === 'posts'}"
            class="stats-tab column is-2-tablet is-4-mobile has-text-centered"
          >
            <p class="stat-val">{{postCount}}</p>
            <p class="stat-key">Posts</p>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'meetups'" class="columns is-mobile is-multiline">
        <div class="column is-3-tablet is-6-mobile" v-for="meetup in meetups" :key="meetup._id">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="meetup.image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p
                    class="title is-4"
                    :style="{'color': '#212121', 'font-weight': 'bold'}"
                  >{{meetup.title}}</p>

                  <p class="subtitle is-6">
                    <span
                      class="tag subtitle"
                      :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '500' }"
                    >{{meetup.category.name | capitalize}}</span>
                  </p>
                </div>
              </div>
              <div class="content">
                <p>{{meetup.shortInfo}}</p>
              </div>
            </div>
            <footer class="card-footer">
              <router-link
                :style="{  'color':  '#ff1154' }"
                :to="{name: 'PageMeetupEdit', params: {meetupId: meetup._id}}"
                class="card-footer-item"
              >Edit</router-link>
              <!-- <a class="card-footer-item">Delete</a> -->
            </footer>
          </div>
          <br />
        </div>
      </div>

      <div v-if="activeTab === 'threads'" class="columns is-mobile is-multiline">
        <div class="column is-3-tablet is-6-mobile" v-for="thread in threads" :key="thread._id">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p
                    class="title is-4"
                    :style="{'color': '#212121', 'font-weight': 'bold'}"
                  >{{thread.title}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <!-- <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>-->
            </footer>
          </div>
          <br />
        </div>
      </div>

      <div v-if="activeTab === 'posts'" class="columns is-mobile is-multiline">
        <div class="column is-3-tablet is-6-mobile" v-for="post in posts" :key="post._id">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p
                    class="title is-4"
                    :style="{'color': '#212121', 'font-weight': 'bold'}"
                  >{{post.text}}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <!-- <a class="card-footer-item">Share</a>
              <a class="card-footer-item">Delete</a>-->
            </footer>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserUpdateModal from "@/components/UserUpdateModal";
import { mapState } from "vuex";
export default {
  components: {
    UserUpdateModal
  },
  data() {
    return {
      activeTab: "meetups"
    };
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.user,
      stats: state => state.stats,
      meetups: state => state.stats.meetups.data,
      threads: state => state.stats.threads.data,
      posts: state => state.stats.posts.data,
      meetupCount: state => state.stats.meetups.count,
      threadCount: state => state.stats.threads.count,
      postCount: state => state.stats.posts.count
    })
  },
  created() {
    this.$store.dispatch("stats/fetchUserStats").then(stats => {
      console.log(stats);
    });
  },
  methods: {
    updateUser({ user, done }) {
      this.$store
        .dispatch("auth/updateUser", user)
        .then(() => {
          this.$toasted.success("Profile has been successfully updated", {
            duration: 3000
          });
          done();
        })
        .catch(error => {
          console.log(error);
          done();
        });
    }
  }
};
</script>

<style scoped>
body {
  background: #f5f7fa;
}
.stats-tab {
  border-bottom: 2px solid transparent;
  transition: 0.5s;
}
.stats-tab:hover {
  cursor: pointer;
  border-bottom: 2px solid black;
}
.stats-tab.isActive {
  border-bottom: 2px solid black;
}
.stat-val {
  font-size: 3em;
  padding-top: 20px;
  font-weight: bold;
}
.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}
.section.profile-heading
  .column.is-2-tablet.has-text-centered
  + .has-text-centered {
  border-left: 1px dotted rgba(0, 0, 0, 0.2);
}
.container.profile {
  margin-top: 1%;
}
.control.is-pulled-left span.select {
  margin-right: 5px;
  border-radius: 2px;
}
.modal-card .content h1 {
  padding: 40px 10px 10px;
  border-bottom: 1px solid #dadada;
}
.container.profile .profile-options .tabs ul li.link a {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f1f1f1;
}
</style>
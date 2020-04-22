<template>
  <div class="meetup-detail-page">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">{{ meetup.startDate | formatDate2 }}</h2>
          <h1 class="title">{{ meetup.title }}</h1>
          <article class="media v-center">
            <figure class="media-left">
              <p class="image is-64x64">
                <img class="is-rounded" :src="meetup.meetupCreator.avatar" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  Created by
                  <strong>{{ meetup.meetupCreator.name }}</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="is-pulled-right">
          <button
            v-if="isMember"
            @click="leaveMeetup"
            class="button"
            :style="{  'background-color':  '#ff1154', 'color': '#fff', 'font-weight': '500' }"
          >Leave Meetup</button>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
              <div class="meetup-side-box">
                <div class="meetup-side-box-date m-b-sm">
                  <p>
                    <b :style="{'color': '#212121', 'font-weight': 'bold'}">Date</b>
                  </p>

                  <p>{{ meetup.startDate | formatDate2 }}</p>
                </div>
                <div class="meetup-side-box-date m-b-sm">
                  <p>
                    <b :style="{'color': '#212121', 'font-weight': 'bold'}">Time</b>
                  </p>

                  <span>{{ meetup.timeFrom }}</span> -
                  <span>{{ meetup.timeTo }}</span>
                </div>
                <div class="meetup-side-box-place m-b-sm">
                  <p>
                    <b :style="{'color': '#212121', 'font-weight': 'bold'}">How to find us</b>
                  </p>

                  <p>{{ meetup.location }}</p>
                </div>
                <div class="meetup-side-box-more-info">
                  <p>
                    <b :style="{'color': '#212121', 'font-weight': 'bold'}">Additional Infos</b>
                  </p>

                  <p>{{ meetup.shortInfo }}</p>
                </div>
              </div>
              <div class="meetup-side-box-map">
                <img
                  :src="meetup.image"
                  class="venueMap-mapImg span--100"
                  alt="Location image of meetup venue"
                />
              </div>

              <p class="menu-label">Threads</p>
              <ul>
                <li v-for="thread in sortedThread" :key="thread._id">{{ thread.title }}</li>
              </ul>
              <p class="menu-label">Who is Going</p>
              <div class="columns is-multiline is-mobile">
                <div class="column is-3" v-for="person in meetup.joinedPeople" :key="person._id">
                  <figure class="image is-64x64">
                    <img class="is-rounded" :src="person.avatar" alt="Image" />
                  </figure>
                </div>
              </div>
            </aside>
          </div>
          <div class="column is-7 is-offset-1">
            <div class="content is-medium">
              <h3
                class="title is-3"
                :style="{'color': '#212121', 'font-weight': 'bold'}"
              >About the Meetup</h3>

              <p>{{ meetup.description }}</p>

              <button v-if="canJoin" @click="joinMeetup" class="button is-primary">Join In</button>

              <button
                v-if="!isAuthenticated"
                :disabled="true"
                class="button is-warning"
              >You need authenticate in order to join</button>
              <ThreadCreateModal
                v-if="isMember || isOwner"
                :btnTitle="`Welcome ${currentUser.username}, Start a new thread`"
                :title="'Create Thread'"
                @threadSubmitted="createThread"
              />
            </div>
            <ThreadList :threads="sortedThread" :canMakePost="canMakePost" />
            <button
              :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '500' }"
              v-if="!isAllThreadsLoaded"
              @click="fetchThreadsHandler"
              class="button"
            >Load More Threads</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ThreadList from "@/components/ThreadList";
import ThreadCreateModal from "@/components/ThreadCreateModal";
import axios from "axios";
export default {
  components: {
    ThreadCreateModal,
    ThreadList
  },
  data() {
    return {
      threadPageNum: 1,
      threadPageSize: 5
    };
  },
  computed: {
    ...mapState({
      meetup: state => state.meetups.item,
      threads: state => state.threads.items,
      currentUser: state => state.auth.user,
      isAllThreadsLoaded: state => state.threads.isAllThreadsLoaded
    }),

    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    isOwner() {
      return this.$store.getters["auth/isOwner"](this.meetup.meetupCreator._id);
    },
    isMember() {
      return this.$store.getters["auth/isMember"](this.meetup._id);
    },
    canJoin() {
      return !this.isOwner && this.isAuthenticated && !this.isMember;
    },
    sortedThread() {
      return this.threads.sort((thread, nextThread) => {
        return new Date(nextThread.createdAt) - new Date(thread.createdAt);
      });
    },
    canMakePost() {
      return this.isAuthenticated && (this.isMember || this.isOwner);
    }
  },
  methods: {
    ...mapActions("meetups", ["fetchMeetup"]),
    ...mapActions("threads", ["fetchThreads", "addThread", "addPostToThread"]),

    fetchThreadsHandler({ meetupId, init }) {
      const filter = {
        pageNum: this.threadPageNum,
        pageSize: this.threadPageSize
      };
      this.fetchThreads({
        meetupId: meetupId || this.meetup._id,
        filter,
        init
      }).then(() => {
        this.threadPageNum++;
      });
    },
    joinMeetup() {
      return this.$store.dispatch("meetups/joinMeetup", this.meetup._id);
    },
    leaveMeetup() {
      return this.$store.dispatch("meetups/leaveMeetup", this.meetup._id);
    },

    createThread({ title, done }) {
      this.addThread({ title, meetupId: this.meetup._id }).then(
        () =>
          this.$toasted.success("Thread Successfully Created!", {
            duration: 3000
          }),

        done()
      );
    }
  },
  created() {
    const meetupId = this.$route.params.id;
    this.fetchMeetup(meetupId), this.fetchThreads(meetupId);
    this.fetchThreadsHandler({ meetupId, init: true });

    if (this.isAuthenticated) {
      this.$socket.emit("meetup/subscribe", meetupId);
      this.$socket.on("meetup/postPublished", post =>
        this.addPostToThread({ post, threadId: post.thread })
      );
    }
  },
  destroyed() {
    this.$socket.removeListener("meetup/postPublished", this.addPostToThread);
    this.$socket.emit("meetup/unsubscribe", this.meetup._id);
  }
};
</script>

<style scoped lang="scss">
.tag.is-warning {
  opacity: 0.5;
}
.meetup-detail-page {
  background-color: #f5f5f5;
  .mapouter {
    text-align: right;
    height: 500px;
    width: 600px;
  }
  .gmap_canvas {
    overflow: hidden;
    background: none !important;
    height: 500px;
    width: 600px;
  }
  .hero-body {
    background-color: white;
    border: 1px solid rgba(46, 62, 72, 0.12);
    color: white;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url("https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    > p,
    h1,
    h2,
    strong {
      color: white;
    }
  }
  .meetup-side-box {
    background-color: white;
    border-radius: 10px;
    font-size: 16px;
    padding: 15px;
  }
}
pre,
.message {
  max-width: 960px;
}
.v-center {
  align-items: center;
}
li {
  margin: 10px;
}
.hero.is-primary {
  background: linear-gradient(to top right, #524ad0 10%, #d099fa);
}
.box {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
}
.box span.icon {
  float: right;
  font-size: 1.7em;
  padding: 2rem 2rem 0 0;
}
.is-large.fab {
  font-size: 7em;
}
.is-large.fas {
  font-size: 5em;
  margin-left: 0.2em;
}
.media-content {
  overflow: hidden;
}
.menu-list li a:hover {
  background: #d9d9d9;
}
.token.number {
  display: inline;
  padding: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: inherit;
  vertical-align: inherit;
  border-radius: inherit;
  font-weight: inherit;
  white-space: inherit;
  background: inherit;
  margin: inherit;
}
.footer {
  background-color: white;
}
</style>

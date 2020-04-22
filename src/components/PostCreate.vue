<template>
  <form class="post-create">
    <div class="field">
      <textarea
        v-model="text"
        v-auto-expand
        class="textarea textarea-post"
        placeholder="Write a post"
        rows="1"
      ></textarea>
      <button
        :disabled="!text"
        class="button m-t-sm"
        @click.prevent="sendPost"
        :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '600' }"
      >Send</button>
    </div>
  </form>
</template>

<script>
import autoExpand from "@/directives/autoExpand";
export default {
  directives: {
    autoExpand
  },
  props: {
    threadId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      text: null
    };
  },
  computed: {
    meetup() {
      return this.$store.state.meetups.item;
    }
  },

  methods: {
    sendPost() {
      this.$store
        .dispatch("threads/sendPost", {
          text: this.text,
          threadId: this.threadId
        })
        .then(createdPost => {
          this.$socket.emit("meetup/postSaved", {
            ...createdPost,
            meetup: this.meetup._id
          });
          this.text = "";
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped lang="scss">
.textarea-post {
  padding-bottom: 30px;
}
.post-create {
  margin-bottom: 15px;
}
</style>
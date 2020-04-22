<template>
  <div class="content is-medium">
    <h3 class="title is-3" :style="{'color': '#212121', 'font-weight': 'bold'}">Threads</h3>
    <div class="box" v-for="thread in  threads" :key="thread._id">
      <h4
        id="const"
        class="title is-3"
        :style="{'color': '#212121', 'font-weight': 'bold'}"
      >{{ thread.title }}</h4>
      <PostCreate v-if="canMakePost" :threadId="thread._id" />

      <article class="media post-item" v-for="post in thread.posts" :key="post._id">
        <figure class="media-left is-rounded user-image">
          <p class="image is-32x32">
            <img class="is-rounded" :src="post.user.avatar" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content is-medium">
            <div class="post-content">
              <strong class="author">{{ post.user.name }}</strong>
              {{ " " }}
              <small class="post-time">
                {{
                post.updatedAt | fromNow
                }}
              </small>
              <br />
              <p class="post-content-message">{{ post.text }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import PostCreate from "@/components/PostCreate";
export default {
  components: {
    PostCreate
  },
  props: {
    threads: {
      type: Array,
      required: true
    },
    canMakePost: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  figure {
    margin-bottom: 0;
  }
}
.media-content {
  background-color: #f1f1f1;
  padding: 3px 20px;
  border-radius: 10px;
  margin-right: 40px;
  width: 100px;
}
.media-left.user-image {
  margin: 0;
  margin-right: 15px;
}

.media + .media {
  border: none;
  margin-top: 0;
}
.post-content {
  margin: 0;
  &-message {
    font-size: 16px;
  }
  .author {
    font-size: 18px;
  }
  .post-time {
    font-size: 16px;
  }
}
</style>
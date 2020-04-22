<template>
  <div class="column is-one-quarter" :style="{ 'min-height': '160px' }">
    <router-link :to="{name: 'PageMeetupFindCategory',
     params: {category: category.name}}">
      <span class="is-primary is-top is-medium tooltip">
        <figure class="image is-4by3 imageFade">
          <img class="is-rounded" v-bind:src="category.image" alt />
        </figure>
        <!-- capitalize comes from filter in main.js -->
        <div
          class="subtitle-category m-t-xs bold"
          :style="{'color': 'black'}"
        >{{ category.name | capitalize }}</div>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      required: true,
      type: Object
    }
  }
};
</script>

<style scoped>
.is-rounded {
  border-radius: 10px !important;
}

.subtitle-category {
  color: #212121;
  font-family: Graphik Meetup, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, Arial, sans-serif;
  font-size: 16px;
}
</style>

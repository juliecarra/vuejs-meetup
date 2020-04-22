<template>
  <section class="hero is-primary is-medium">
    <div class="hero-bg">
      <div class="hero-body">
        <div class="container hero-flex">
          <h1 class="title" :style="{'font-weight': '900'}">Explore {{categoryName | capitalize}}</h1>

          <h2 class="subtitle">
            Find out what's happening in
            <span v-if="categoryName">{{categoryName}}</span> Meetup groups around the world and start meeting up with the ones near you.
          </h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    categoryName: {
      required: true,
      type: String
    }
  }
};
</script>

<style scoped>
.hero-bg {
  background-image: url("https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80");
  background-position: center;
}

.hero-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
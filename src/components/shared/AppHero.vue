<template>
  <section class="hero is-primary is-medium">
    <div class="hero-bg">
      <div class="hero-body">
        <div class="container hero-flex">
          <h1 class="title" :style="{'font-weight': '900'}">The real world is calling</h1>

          <h2
            class="subtitle"
          >Join a local group to meet people, try something new, or do more of what you love.</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
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

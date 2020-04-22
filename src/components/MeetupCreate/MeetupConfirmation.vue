<template>
  <div>
    <h1
      class="title m-b-sm"
      :style="{'color': '#212121', 'font-weight': 'bold'}"
    >Please confirm entered data</h1>

    <div class="content">
      <div>
        <span class="result-title" :style="{'color': '#212121', 'font-weight': 'bold'}">Location</span>
        <p>{{meetupConfirm.location}}</p>
      </div>
      <div>
        <span class="result-title" :style="{'color': '#212121', 'font-weight': 'bold'}">Title</span>
        <p>{{meetupConfirm.title}}</p>
      </div>
      <div>
        <span class="result-title" :style="{'color': '#212121', 'font-weight': 'bold'}">Start Date</span>
        <p>{{meetupConfirm.startDate | formatDate2}}</p>
      </div>
      <div>
        <span class="result-title" :style="{'color': '#212121', 'font-weight': 'bold'}">From</span>
        <p>{{meetupConfirm.timeFrom}}</p>
      </div>
      <div>
        <span class="result-title" :style="{'color': '#212121', 'font-weight': 'bold'}">To</span>
        <p>{{meetupConfirm.timeTo}}</p>
      </div>
      <div>
        <span class="result-title" :style="{'color': '#212121', 'font-weight': 'bold'}">Category</span>
        <p>{{meetupConfirm.category.name}}</p>
      </div>
      <div>
        <span class="result-title">Image</span>
        <p>{{meetupConfirm.image}}</p>
      </div>
      <div>
        <span class="result-title">Short Info</span>
        <p>{{meetupConfirm.shortInfo}}</p>
      </div>
      <div>
        <span class="result-title">Description</span>
        <p>{{meetupConfirm.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meetupConfirm: {
      type: Object,
      required: true
    }
  },

  validations: {}
};
</script>

<style scoped>
.result-title {
  font-size: 29px;
  font-weight: bold;
}
.result-title + p {
  font-size: 20px;
}
</style>
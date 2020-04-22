<template>
  <div class="column is-one-third">
    <div class="card is-hoverable large">
      <router-link :to="'/meetups/' + meetup._id" class="card large">
        <div class="card" :style="{'border-radius': '10px'}">
          <div class="card-content">
            <p
              class="subtitle"
              :style="{'color': '#00a2c7', 'font-weight': '700', 'font-size': '14px' }"
            >{{ meetup.startDate | formatDate2 }}</p>
            <p
              class="title"
              :style="{'color': '#212121', 'font-weight': 'bolder', 'font-size': '20px'}"
            >{{meetup.title}}</p>
            <p class="subtitle" :style="{'font-size': '14px'}">{{meetup.description}}</p>
            <span
              class="tag"
              :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '500' }"
            >{{ meetup.category.name }}</span>
            <br />
            <p
              class="subtitle"
              :style="{'font-size': '14px', 'color': 'gray'}"
            >{{meetup.joinedPeopleCount}} attendees</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meetup: {
      required: true,
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  font-size: 1rem;
}

.title.is-4 {
  font-size: 1rem;
}

.is-hoverable {
  transition: 0.3s;
  &:hover {
    -webkit-box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
    -moz-box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
    box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
  }
}
</style>

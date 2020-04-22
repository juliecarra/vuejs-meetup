<template>
  <div class="meetup-create-page">
    <section class="section">
      <div class="container">
        <MeetupCreateWizard @meetupConfirmCreate="createMeetup" />
      </div>
    </section>
  </div>
</template>

<script>
import MeetupCreateWizard from "@/components/MeetupCreate/MeetupCreateWizard";
export default {
  components: {
    MeetupCreateWizard
  },
  computed: {
    categories() {
      return this.$store.state.categories.items;
    }
  },
  created() {
    if (this.categories.length === 0) {
      this.$store.dispatch("categories/fetchCategories");
    }
  },

  methods: {
    createMeetup(meetup) {
      this.$store
        .dispatch("meetups/createMeetup", meetup)
        .then(createdMeetup => {
          this.$router.push(`/meetups/${createdMeetup._id}`);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped lang="scss">
.meetup-create-page {
  min-height: 100vh;
}
</style>
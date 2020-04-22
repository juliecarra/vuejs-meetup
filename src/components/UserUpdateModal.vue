<template>
  <div>
    <button
      class="button is-outlined m-t-sm"
      @click="isOpen = !isOpen"
      :style="{  'color':  '#ff1154' }"
    >Update Profile</button>
    <div :class="['modal', {'is-active': isOpen}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">User Profile</p>
          <button class="delete" aria-label="close" @click="isOpen = false"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">Name</label>
              <input v-model="currentUser.name" class="input" />
            </div>
            <div class="field">
              <label class="title">Username</label>
              <input v-model="currentUser.username" class="input" />
            </div>
            <div class="field">
              <label class="title">Avatar</label>
              <input v-model="currentUser.avatar" class="input" />
            </div>
            <div class="field">
              <label class="title">Infos</label>
              <input v-model="currentUser.infos" class="input" />
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="emitUser"
            :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '500' }"
          >Save changes</button>
          <button
            class="button"
            @click="isOpen = false"
            :style="{  'background-color':  '#ff1154', 'color': '#fff', 'font-weight': '500' }"
          >Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      currentUser: { ...this.authUser }
    };
  },
  methods: {
    emitUser() {
      this.$emit("userSubmitted", {
        user: this.currentUser,
        done: () => (this.isOpen = false)
      });
    }
  }
};
</script>

<style scoped>
label {
  color: #212121;
  font-family: Graphik Meetup, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, Arial, sans-serif;
}
</style>
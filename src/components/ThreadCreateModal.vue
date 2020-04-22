<template>
  <div>
    <button
      class="button"
      @click="isOpen = !isOpen"
      :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '600' }"
    >{{btnTitle}}</button>

    <div :class="['modal', {'is-active': isOpen}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{title}}</p>

          <button class="delete" aria-label="close" @click="isOpen = false"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label
                class="title"
                :style="{'color': '#212121', 'font-weight': 'bold'}"
              >What would you like to ask?</label>

              <textarea
                v-model="form.title"
                class="textarea"
                placeholder="Just write something that you are interested in"
                rows="10"
              ></textarea>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="threadSubmitted"
            :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '600' }"
          >Save changes</button>

          <button
            :style="{  'background-color':  '#ff1154', 'color': '#fff', 'font-weight': '500' }"
            class="button"
            @click="isOpen = false"
          >Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnTitle: {
      type: String,
      required: false,
      default: "Open Modal"
    },

    title: {
      type: String,
      required: false,
      default: "Create"
    }
  },
  data() {
    return {
      isOpen: false,

      form: {
        title: null
      }
    };
  },

  methods: {
    threadSubmitted() {
      const { title } = this.form;
      this.$emit("threadSubmitted", {
        title,
        done: () => {
          (this.form.title = ""), (this.isOpen = false);
        }
      });
    }
  }
};
</script>

<style>
</style>
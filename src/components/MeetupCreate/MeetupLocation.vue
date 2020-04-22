<template>
  <div>
    <h1
      class="title m-b-sm"
      :style="{'color': '#212121', 'font-weight': 'bold'}"
    >First, set your group’s location.</h1>
    <div class="m-b-lg">
      <span v-if="ipLocation && !changeLocation" class="subtitle">{{ipLocation}}</span>
      <br />
      <a
        v-if="ipLocation && !changeLocation"
        @click="toggleLocation"
        :style="{'color': '#00a2c7'}"
      >Change location</a>
      <a
        :style="{'color': '#00a2c7'}"
        v-if="ipLocation && changeLocation"
        @click="toggleLocation"
      >Set default location</a>
      <input
        v-if="!ipLocation || changeLocation"
        @input="emitFormData"
        v-model="form.location"
        type="text"
        class="input"
        @blur="$v.form.location.$touch()"
      />
      <div v-if="$v.form.location.$error">
        <span v-if="!$v.form.location.required" class="help is-danger">Location is required</span>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      changeLocation: false,
      form: {
        location: null
      }
    };
  },
  validations: {
    form: {
      location: { required }
    }
  },
  computed: {
    ipLocation() {
      return this.$store.getters["meta/location"];
    }
  },
  methods: {
    emitFormData() {
      this.$emit("stepUpdated", { data: this.form, valid: !this.$v.$invalid });
    },

    toggleLocation() {
      if (this.ipLocation) {
        this.form.location = this.ipLocation;
        this.emitFormData();
      }
      this.changeLocation = !this.changeLocation;
    }
  },
  created() {
    if (this.ipLocation) {
      this.form.location = this.ipLocation;
      this.emitFormData();
    }
  }
};
</script>

<style scoped>
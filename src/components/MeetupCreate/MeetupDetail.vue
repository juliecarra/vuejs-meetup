<template>
  <form @input="emitFormData">
    <div class="field">
      <label class="title m-b-sm" :style="{'color': '#212121', 'font-weight': 'bold'}">Title</label>
      <input
        v-model="form.title"
        class="input"
        type="text"
        placeholder="Enter Title"
        @blur="$v.form.title.$touch()"
      />
      <div v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="help is-danger">Title is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm" :style="{'color': '#212121', 'font-weight': 'bold'}">Start Date</label>
      <!-- <input
        v-model="form.startDate"
        @blur="$v.form.startDate.$touch()"
        class="input"
        type="text"
        placeholder="Starts At"
      />-->
      <datepicker
        @input="setDate"
        :placeholder="new Date() | formatDate2"
        :input-class="'input'"
        :disabledDates="disabledDates"
      ></datepicker>
      <div v-if="$v.form.startDate.$error">
        <span v-if="!$v.form.startDate.required" class="help is-danger">Starts at is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm" :style="{'color': '#212121', 'font-weight': 'bold'}">From</label>
      <vue-timepicker :minute-interval="10" @change="changeTime($event, 'timeFrom')"></vue-timepicker>
    </div>
    <div class="field">
      <label class="title m-b-sm" :style="{'color': '#212121', 'font-weight': 'bold'}">To</label>
      <vue-timepicker :minute-interval="10" @change="changeTime($event, 'timeTo')"></vue-timepicker>
    </div>
    <div class="field">
      <label class="title m-b-sm" :style="{'color': '#212121', 'font-weight': 'bold'}">Category</label>
      <div class="m-b-lg">
        <div class="select">
          <!-- TODO: Get Here Categories -->
          <select v-model="form.category" @change="emitFormData">
            <option
              @blur="$v.form.category.$touch()"
              v-for="category of categories"
              :value="category"
              :key="category.id"
            >{{ category.name }}</option>
          </select>
        </div>
        <div v-if="$v.form.category.$error">
          <span v-if="!$v.form.category.required" class="help is-danger">Category is required</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import * as moment from "moment";
import Datepicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Datepicker,
    VueTimepicker
  },
  data() {
    return {
      disabledDates: {
        customPredictor: function(date) {
          const today = new Date();
          //so that today's date is not disbaled
          const yesterday = today.setDate(today.getDate() - 1);
          return date < today;
        }
      },

      form: {
        title: null,
        startDate: null,
        timeTo: null,
        timeFrom: null,
        category: null
      }
    };
  },
  validations: {
    form: {
      title: { required },
      startDate: { required },
      category: { required },
      timeTo: { required },
      timeFrom: { required }
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.items;
    }
  },

  methods: {
    emitFormData() {
      this.$emit("stepUpdated", { data: this.form, valid: !this.$v.$invalid });
    },

    setDate(date) {
      this.form.startDate = moment(date).format();
      this.emitFormData();
    },
    changeTime({ data }, field) {
      const minutes = data.mm | "00";
      const hours = data.HH | "00";
      this.form[field] = hours + ":" + minutes;
      this.emitFormData();
    }
  }
};
</script>

<style scoped>
.time-picker {
  display: block;
}
</style>

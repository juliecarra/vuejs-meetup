<template>
  <div class="meetup-create-form">
    <div class="current-step is-pulled-right">{{ currentStep }} of {{ totalSteps }}</div>

    <keep-alive>
      <component
        :is="currentComponent"
        @stepUpdated="mergeStepDatas"
        ref="currentComponent"
        :meetupConfirm="form"
      />
    </keep-alive>
    <progress class="progress" :value="progressBar" max="100">{{ progressBar }}%</progress>
    <div class="controll-btns m-b-md flex-container">
      <button
        :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '600' }"
        class="button is-primary m-r-sm"
        @click="moveToPreviousStep"
        v-if="currentStep !== 1"
      >Back</button>
      <button
        :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '600' }"
        :disabled="!canProceed"
        class="button"
        @click="moveToNextStep"
        v-if="currentStep !== totalSteps"
      >Next</button>

      <button
        v-else
        class="button"
        @click="createMeetup"
        :style="{  'background-color':  '#00a2c7', 'color': '#fff', 'font-weight': '600' }"
      >Confirm</button>
    </div>
  </div>
</template>

<script>
import MeetupLocation from "./MeetupLocation";
import MeetupDetail from "./MeetupDetail";
import MeetupDescription from "./MeetupDescription";
import MeetupConfirmation from "./MeetupConfirmation";
export default {
  components: {
    MeetupLocation,
    MeetupDetail,
    MeetupDescription,
    MeetupConfirmation
  },
  data() {
    return {
      currentStep: 1,
      totalSteps: 4,
      canProceed: false,
      formSteps: [
        "MeetupLocation",
        "MeetupDetail",
        "MeetupDescription",
        "MeetupConfirmation"
      ],
      form: {
        location: null,
        title: null,
        startDate: null,
        category: null,
        image: null,
        shortInfo: null,
        description: null,
        timeTo: null,
        timeFrom: null
      }
    };
  },
  computed: {
    progressBar() {
      return (100 / this.totalSteps) * this.currentStep;
    },

    totalSteps() {
      return this.formSteps.length;
    },

    currentComponent() {
      // -1 because currentStep begins at 1 but first index of an array is 0
      return this.formSteps[this.currentStep - 1];
    }
  },
  methods: {
    mergeStepDatas(step) {
      this.form = { ...this.form, ...step.data };
      this.canProceed = step.valid;
    },
    moveToNextStep() {
      this.currentStep += 1;

      //Defer the callback to be executed after the next DOM updated cycle
      this.$nextTick(() => {
        this.canProceed = !this.$refs["currentComponent"].$v.$invalid; //Check if the current component is valid (if we entered required data)
      });
    },

    moveToPreviousStep() {
      this.currentStep -= 1;
      this.canProceed = true;
    },

    createMeetup() {
      this.$emit("meetupConfirmCreate", this.form);
    }
  }
};
</script>

<style scoped>
.meetup-create-form {
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 840px;
  padding: 24px 16px 8px;
  width: 100%;
}

.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

<template>
  <form class="m-b-md" @input="emitFormData">
    <div class="field">
      <label class="title" :style="{'color': '#212121', 'font-weight': 'bold'}">Image</label>
      <input
        v-model="form.image"
        @blur="$v.form.image.$touch()"
        class="input"
        type="text"
        placeholder="Image URL"
      />
      <div v-if="$v.form.image.$error">
        <span v-if="!$v.form.image.required" class="help is-danger">Image is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title" :style="{'color': '#212121', 'font-weight': 'bold'}">Additional Infos</label>
      <textarea
        v-model="form.shortInfo"
        @blur="$v.form.shortInfo.$touch()"
        class="textarea"
        placeholder="Write a short infos"
        rows="3"
      ></textarea>
      <div v-if="$v.form.shortInfo.$error">
        <span v-if="!$v.form.shortInfo.required" class="help is-danger">Additional info is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title" :style="{'color': '#212121', 'font-weight': 'bold'}">Long Description</label>
      <textarea
        @blur="$v.form.description.$touch()"
        v-model="form.description"
        class="textarea"
        placeholder="Write a description"
        rows="10"
      ></textarea>
      <div v-if="$v.form.description.$error">
        <span v-if="!$v.form.description.required" class="help is-danger">Description is required</span>
      </div>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        image: null,
        shortInfo: null,
        description: null
      }
    };
  },
  validations: {
    form: {
      image: {
        required
      },
      shortInfo: {
        required
      },
      description: {
        required
      }
    }
  },
  methods: {
    emitFormData() {
      this.$emit("stepUpdated", { data: this.form, valid: !this.$v.$invalid });
    }
  }
};
</script>
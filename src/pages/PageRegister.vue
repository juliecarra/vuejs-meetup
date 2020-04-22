<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body" :style="{'background-color': '#fff'}">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3
            class="title-register"
            :style="{'color': '#212121', 'font-size': '34px', 'font-weight': 'bolder'}"
          >Sign up</h3>
          <p class="subtitle-register" :style="{'color': '#212121'}">Please sign up to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128" />
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="text"
                    placeholder="Username"
                    v-model="form.username"
                    @blur="$v.form.username.$touch()"
                  />

                  <div v-if="$v.form.username.$error" class="form-error">
                    <span
                      v-if="!$v.form.username.required"
                      class="help is-danger"
                    >Username is required</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="text"
                    placeholder="Name"
                    v-model="form.name"
                    @blur="$v.form.name.$touch()"
                  />
                  <div v-if="$v.form.name.$error" class="form-error">
                    <span v-if="!$v.form.name.required" class="help is-danger">Name is required</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="email"
                    placeholder="Your Email"
                    v-model="form.email"
                    @blur="$v.form.email.$touch()"
                  />
                  <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger">Email is required</span>
                    <span
                      v-if="!$v.form.email.email"
                      class="help is-danger"
                    >Email address is not valid</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="text"
                    placeholder="Avatar"
                    autocomplete
                    v-model="form.avatar"
                    @blur="$v.form.avatar.$touch()"
                  />

                  <div v-if="$v.form.avatar.$error" class="form-error">
                    <span v-if="!$v.form.avatar.url" class="help is-danger">Url format is not valid</span>
                    <span
                      v-if="!$v.form.avatar.supportedFileType"
                      class="help is-danger"
                    >Selected file type is not supported</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autocomplete="new-password"
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
                  />

                  <div v-if="$v.form.password.$error" class="form-error">
                    <span
                      v-if="!$v.form.password.required"
                      class="help is-danger"
                    >Password is required</span>
                    <span
                      v-if="!$v.form.password.minLength"
                      class="help is-danger"
                    >Password should be at least 6 characters</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Password Confirmation"
                    autocomplete="off"
                    v-model="form.passwordConfirmation"
                    @blur="$v.form.passwordConfirmation.$touch()"
                  />
                  <div v-if="$v.form.passwordConfirmation.$error" class="form-error">
                    <span
                      v-if="!$v.form.passwordConfirmation.required"
                      class="help is-danger"
                    >Password Confirmation is required</span>
                    <span v-if="!$v.form.passwordConfirmation.sameAs" class="help is-danger">
                      Password Confirmation should be the same as
                      password
                    </span>
                  </div>
                </div>
              </div>
              <button
                :disabled="isFormInvalid"
                @click.prevent="onSubmit"
                type="submit"
                :style="{'background-color': '#ff1154',  'color': 'white', 'font-weight': 'bolder'}"
                class="button is-block is-info is-large is-fullwidth"
              >Sign up</button>
            </form>
          </div>
          <p :style="{'color': '#212121', 'font-weight': '400' }">
            Already a member?
            <router-link
              :to="{ name: 'PageLogin' }"
              :style="{'color': '#ff1154', 'font-weight': 'bold' }"
            >Log in</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  required,
  email,
  minLength,
  sameAs,
  url
} from "vuelidate/lib/validators";
import { supportedFileType } from "@/helpers/validators";
export default {
  data() {
    return {
      form: {
        username: "",
        name: "",
        email: "",
        avatar: "",
        password: "",
        passwordConfirmation: ""
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      name: { required },

      email: {
        required
      },

      avatar: {
        url,
        supportedFileType
      },

      password: {
        required,
        minLength: minLength(6)
      },
      passwordConfirmation: {
        required,
        sameAs: sameAs("password")
      }
    }
  },
  computed: {
    isFormInvalid() {
      return this.$v.form.$invalid;
    }
  },
  methods: {
    onSubmit() {
      this.$v.form.$touch(); //activate validation of the form
      this.$store
        .dispatch("auth/registerUser", this.form)
        .then(() => this.$router.push("/login"))
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}

.title-register,
.subtitle-register {
  font-family: Graphik Meetup, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, Arial, sans-serif;
}
</style>

<template>
  <div class="container">
    <v-progress-linear
      indeterminate
      color="cyan"
      v-if="loading"
    ></v-progress-linear>
    <h1 class="font-weight-medium">
      {{ reg_log ? "Check in" : "Enter system" }}
    </h1>
    <v-form ref="form" class="auth-window" v-if="!reg_log">
      <v-text-field label="Email" v-model="form.email"></v-text-field>
      <!-- :error-messages="emailErrors"
        @input="$v.form.email.$touch()"
        @blur="$v.form.email.$touch()" -->
      <v-text-field label="Password" v-model="form.password"></v-text-field>

      <!-- :error-messages="passwordErrors"
        @input="$v.form.password.$touch()"
        @blur="$v.form.password.$touch()" -->
      <v-btn color="success" class="mt-2" block @click="login"> Sign in </v-btn>

      <v-btn color="#BBDEFB" class="mt-2" block @click="changeChoose">
        I have an account
      </v-btn>

      <v-btn block color="warning" class="mt-2" @click="guestEnter">
        Log in as a guest
      </v-btn>
    </v-form>

    <v-form ref="form" class="auth-window" v-if="reg_log">
      <v-text-field
        label="Login"
        v-model="form.name"
        :error-messages="nameErrors"
        @input="$v.form.name.$touch()"
        @blur="$v.form.name.$touch()"
      ></v-text-field>

      <v-text-field
        label="Email"
        v-model="form.email"
        :error-messages="emailErrors"
        @input="$v.form.email.$touch()"
        @blur="$v.form.email.$touch()"
      ></v-text-field>

      <v-text-field
        label="Password"
        v-model="form.password"
        :error-messages="passwordErrors"
        @input="$v.form.password.$touch()"
        @blur="$v.form.password.$touch()"
      ></v-text-field>

      <v-btn
        color="success"
        class="mt-2"
        block
        @click="register"
        :disabled="disableButton"
      >
        Check in
      </v-btn>

      <v-btn color="#BBDEFB" class="mt-2" block @click="changeChoose">
        I have an account
      </v-btn>

      <v-btn block color="warning" class="mt-2" @click="guestEnter">
        Log in as a guest
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      reg_log: true,
      loading: false,
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(5),
      },
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      if (!this.$v.form.name.required) {
        errors.push("Name is required.");
      }
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      if (!this.$v.form.email.email) {
        errors.push("Must be valid e-mail");
      } else if (!this.$v.form.email.required) {
        errors.push("E-mail is required");
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      if (!this.$v.form.password.required) {
        errors.push("Password is required");
      } else if (!this.$v.form.password.minLength) {
        errors.push("Minimum 5 characters");
      }
      return errors;
    },
    disableButton() {
      if (this.reg_log) {
        if (
          this.$v.form.name.$invalid ||
          this.$v.form.email.$invalid ||
          this.$v.form.password.$invalid
        ) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    clearFields() {
      this.form.email = "";
      this.form.password = "";
      this.form.name = "";
    },
    changeChoose() {
      this.reg_log = !this.reg_log;
    },
    async register() {
      this.loading = true;
      try {
        const data = await this.$ApiUsers.users.register({ ...this.form });

        this.loading = false;

        this.$store.dispatch("set_user", "user");
        this.$store.dispatch("set_user_data", data);

        localStorage.setItem("user", "user");

        this.clearFields();

        this.changeChoose();
        alert("Success! \nEnter your data again!");
      } catch (error) {
        this.loading = false;
        alert("Something is wrong");
        console.log(error.response.data);
      }
    },
    async login() {
      this.loading = true;
      try {
        const data = (
          await this.$ApiUsers.users.login({
            email: this.form.email,
            password: this.form.password,
          })
        ).data;
        this.loading = false;

        this.$store.dispatch("set_user", "user");
        this.$store.dispatch("set_user_data", data);

        localStorage.setItem("user", "user");

        const user_data = this.$store.getters.GET_USER_DATA;
        localStorage.setItem("token", user_data.token);

        this.$router.push({ name: "PostsPage" });
        this.clearFields();
      } catch (error) {
        this.loading = false;
        alert("Email or password are wrong");
        console.error(error);
      }
    },
    guestEnter() {
      localStorage.setItem("user", "guest");
      this.$router.push({ name: "PostsPage" });
    },
  },
};
</script>

<style scoped>
.auth-window {
  margin-top: 15px;
  width: 445px;
}

.container {
  margin: auto;
  padding: 20px;
  width: 30%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #e3f2fd;
  border-radius: 5px;

  transition: 1s;
}

.container:hover {
  background: #e0f7fa;
}
</style>
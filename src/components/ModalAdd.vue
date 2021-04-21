<template>
  <div class="main">
    <div class="modal">
      <div class="modal_container">
        <v-text-field
          label="Title"
          v-model="post.title"
          :error-messages="titleErrors"
          @input="$v.post.title.$touch()"
          @blur="$v.post.title.$touch()"
        ></v-text-field>

        <v-text-field
          label="Full text"
          v-model="post.fullText"
          :error-messages="fullTextErrors"
          @input="$v.post.fullText.$touch()"
          @blur="$v.post.fullText.$touch()"
        ></v-text-field>

        <v-text-field
          label="Description"
          v-model="post.description"
          :error-messages="descriptionErrors"
          @input="$v.post.description.$touch()"
          @blur="$v.post.description.$touch()"
        ></v-text-field>

        <div class="btns mt-2">
          <v-btn color="error" @click="close"> Close </v-btn>
          <v-btn color="success" @click="addPost(post)" :disabled="disableButton"> Add </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      post: {
        title: "",
        fullText: "",
        description: "",
      },
    };
  },
  validations: {
    post: {
      title: {
        required,
        minLength: minLength(5),
      },
      fullText: {
        required,
        minLength: minLength(20),
      },
      description: {
        required,
        minLength: minLength(3),
      },
    },
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.post.title.$dirty) return errors;
      if (!this.$v.post.title.required) {
        errors.push("Title is required.");
      }else if (!this.$v.post.title.minLength) {
        errors.push("Minimum 5 characters");
      }
      return errors;
    },
    fullTextErrors() {
      const errors = [];
      if (!this.$v.post.fullText.$dirty) return errors;
      if (!this.$v.post.fullText.required) {
        errors.push("Title is required.");
      }else if (!this.$v.post.fullText.minLength) {
        errors.push("Minimum 20 characters");
      }
      return errors;
    },
    descriptionErrors(){
      const errors = []
      if(!this.$v.post.description.$dirty) return errors
      if(!this.$v.post.description.required){
        errors.push('Description is required')
      }else if(!this.$v.post.description.minLength){
        errors.push("Mininun 3 characters")
      }
      return errors
    },
    disableButton(){
        if (
          this.$v.post.title.$invalid ||
          this.$v.post.fullText.$invalid ||
          this.$v.post.description.$invalid
        ) {
          return true;
        }
      return false;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addPost(post) {
      this.$emit("addPost", post);
    },
  },
};
</script>

<style scoped>
.main {
  position: fixed;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: absolute;
  left: 45%;
  top: 40%;
  margin-left: -100px;
  margin-top: -75px;
}

.modal_container {
  border-radius: 5px;
  border: solid 2px #515a6e;
  padding: 5%;
  background-color: #fff;
  width: 400px;
}

.btns {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
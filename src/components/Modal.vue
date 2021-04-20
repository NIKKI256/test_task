<template>
  <div class="main">
    <div class="modal">
      <div class="modal_container">
        <v-text-field
          placeholder="Title..."
          v-model="post.title"
        ></v-text-field>
        <v-text-field
          placeholder="Full text..."
          v-model="post.fullText"
        ></v-text-field>
        <v-text-field
          placeholder="Description..."
          v-model="post.description"
        ></v-text-field>

        <div class="btns">
          <v-btn color="error" @click="close"> Close </v-btn>
          <v-btn color="success" @click="addPost(post)"> Add </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        fullText: "",
        description: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addPost(post) {
      if (
        post.title == "" ||
        post.title.length < 3 ||
        post.fullText == "" ||
        post.fullText.length < 20 ||
        post.description == "" ||
        post.description.length < 3
      ) {
        alert("Fields are incorrect");
      } else {
        this.$emit("addPost", post);
      }
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

.inputs {
  margin-top: 2%;
}

.btns {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
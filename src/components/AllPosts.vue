<template>
  <div>
    <Loader v-if="posts.length == 0" />
    <div v-else>
      <div v-for="post in posts" :key="post._id" class="post mt-2">
        <h2 class="font-weight-medium">{{ post.title }}</h2>
        <h3 class="font-weight-medium">{{ post.description }}</h3>
        <div class="btns">
          <v-btn
            class="mt-1"
            color="#F44336"
            v-if="checkUser == 'user' && post.postedBy == user_id"
            @click="deletePost(post._id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0
                            1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0
                            1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 
                            1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 
                            0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 
                            4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 
                            3V2h11v1h-11z"
              />
            </svg>
            <span class="ml-1">Hide post</span>
          </v-btn>

          <v-btn
            class="mt-1"
            color="warning"
            v-if="checkUser == 'user' && post.postedBy == user_id"
            @click="openModal(post._id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              />
            </svg>
            <span class="ml-1">Edit</span>
          </v-btn>
        </div>
      </div>
      <ModalEdit v-if="isVisibleModal" @close="close" @edit="edit" :post_id="prop_id"/>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader";
import ModalEdit from "./ModalEdit";

export default {
  data() {
    return {
      isVisibleModal: false,
      prop_id:null
    };
  },
  components: {
    Loader,
    ModalEdit,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    checkUser: {
      type: String,
      default: "guest",
    },
    user_id: {
      type: String,
      default: "",
    },
  },
  methods: {
    close(){
      this.isVisibleModal = false
    },
    deletePost(id) {
      this.$emit("deletePost", id);
    },
    openModal(id) {
      this.isVisibleModal = true;
      this.prop_id = id
    },
    async edit(post){
      const updatePost = {
        title:post.title,
        fullText:post.fullText,
        description:post.description
      }
      await this.$ApiPosts.posts.updatePostById({payload:updatePost,id:post._id})
      this.$router.go(0)
    }
  },
};
</script>

<style scoped>
.post {
  border-radius: 5px;
  border: solid 1px #64b5f6;
  background: #bbdefb;
  padding: 5px;
}
.btns {
  display: flex;
  justify-content: space-between;
}
</style>
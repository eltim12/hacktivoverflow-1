<template>
  <div id="main" class="container center">
    <div class="card" id="card">
      <div id="add-question" class="row">
        <div id="form-add" class="container fixed col s12">
          <div class="row">
            <div class="col m10 offset-m1 s12">
              <h4 id="add-question-header" class="center-align">Ask a Question</h4>
              <div class="row">
                <form class="col s12" @submit.prevent="submitQuestion">
                  <div class="row">
                    <div class="input-field col s8 offset-s2">
                      <input
                        id="input-title"
                        type="text"
                        class="validate"
                        autocomplete="off"
                        v-model="title"
                      >
                      <label for="title">Title</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s8 offset-s2">
                      <tags-input
                        element-id="tags"
                        v-model="selectedTags"
                        :existing-tags="{ 
        'web-development': 'Web Development',
        'php': 'PHP',
        'javascript': 'JavaScript',
    }"
                        :typeahead="true"
                      ></tags-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col s10 offset-s1">
                      <ckeditor :editor="editor" v-model="content" :config="editorConfig"></ckeditor>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s8 offset-s2">
                      <button
                        class="btn waves-effect waves-hard blue-grey darken-4"
                        type="submit"
                        name="action"
                      >
                        Submit
                        <i class="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import serverAPI from "@/API/serverAPI";
import VoerroTagsInput from "@voerro/vue-tagsinput";

export default {
  name: "ask-form",
  data() {
    return {
      title: "",
      content: "",
      editor: ClassicEditor,
      editorConfig: {},
      selectedTags: []
    };
  },
  components: { "tags-input": VoerroTagsInput },
  methods: {
    submitQuestion() {
      serverAPI
        .post(
          `/questions`,
          {
            title: this.title,
            content: this.content,
            tags: this.selectedTags,
            userId: localStorage.getItem("userId")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(createdQuestion => {
          console.log("success created question");
          this.$router.push("/");
          this.$store.dispatch("notif", {
            type: "success",
            message:
              "Success added question, please wait for someone to answer."
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#card {
  width: 60rem;
  margin-left: 11rem;
}

#add-question {
  /* margin-left: 8rem; */
  margin-top: 8rem;
}

#add-question-header {
  margin-top: 3rem;
}

input:focus {
  border-bottom: 1px solid rgb(255, 119, 35) !important;
  box-shadow: 0 1px 0 0 rgb(255, 119, 35) !important;
}

input:focus + label {
  color: rgb(255, 119, 35) !important;
}

input:focus {
  border-bottom: 1px solid rgb(255, 119, 35) !important;
  box-shadow: 0 1px 0 0 rgb(255, 119, 35) !important;
}

input:focus + label {
  color: rgb(255, 119, 35) !important;
}

#main {
  padding-top: 3.3rem;
}
</style>

<template>
  <div id="main" class="container center">
    <div class="card" id="card">
      <div id="add-question" class="row">
        <div id="form-add" class="container fixed col s12">
          <div class="row">
            <div class="col m10 offset-m1 s12">
              <h4 id="add-question-header" class="center-align">Edit Question</h4>
              <div class="row">
                <form class="col s12" @submit.prevent="submitEdit">
                  <div class="row">
                    <div class="input-field col s8 offset-s2">
                      <input
                        id="input-title"
                        type="text"
                        class="validate"
                        autocomplete="off"
                        v-model="titleEdit"
                      >
                      <label class="active" for="title">Title</label>
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
                      <ckeditor :editor="editor" v-model="contentEdit" :config="editorConfig"></ckeditor>
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
  name: "edit-question-form",
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      titleEdit: "",
      contentEdit: "",
      currentId: 0,
      selectedTags: []
    };
  },
  components: { "tags-input": VoerroTagsInput },

  created() {
    serverAPI
      .get(`/questions/${this.$route.params.id}`)
      .then(gotQuestion => {
        this.titleEdit = "";
        this.contentEdit = "";
        this.selectedTags = [];

        this.currentId = gotQuestion.data._id;
        this.titleEdit = gotQuestion.data.title;
        this.contentEdit = gotQuestion.data.content;
        this.selectedTags = gotQuestion.data.tags;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    submitEdit() {
      console.log("CURRENT: ", this.currentId);
      serverAPI
        .put(
          `/questions/${this.$route.params.id}`,
          {
            title: this.titleEdit,
            content: this.contentEdit,
            tags: this.selectedTags
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(updatedQuestion => {
          this.$store.dispatch("notif", {
            type: "success",
            message: "Success edit question"
          });
          this.$store.dispatch("getQuestion", {
            questionId: this.currentId
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
  margin: 0 auto;
}

#add-question {
  /* margin-left: 8rem; */
  margin-top: 5rem;
}

#add-question-header {
  margin-top: 3rem;
}

#input-title:focus {
  border-bottom: 1px solid rgb(255, 119, 35);
  box-shadow: 0 1px 0 0 rgb(255, 119, 35);
}

#input-title:focus + label {
  color: rgb(255, 119, 35);
}

#input-content:focus {
  border-bottom: 1px solid rgb(255, 119, 35);
  box-shadow: 0 1px 0 0 rgb(255, 119, 35);
}

#input-content:focus + label {
  color: rgb(255, 119, 35);
}

#main {
  padding-top: 3.3rem;
}
</style>

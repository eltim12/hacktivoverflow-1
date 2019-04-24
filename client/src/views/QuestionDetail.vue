<template>
  <div id="main" class="container center">
    <div class="row">
      <div id="main-content" class="col s6 offset-s3">
        <div class="row">
          <div class="col s12">
            <div class="container left">
              <div>
                <h5 class="title left-align">
                  {{ questionPage.title }}
                  <hr>
                  <h6>Asked by: {{ questionPage.userId.name }}</h6>
                </h5>
              </div>
            </div>
          </div>
          <div id="infos" class="col s12" style="word-wrap:break-word">
            <div class="row">
              <div class="col s2">
                <div id="height-up" class="row">
                  <a class="vote-btn" href @click.prevent="vote('up', questionPage._id)">
                    <i class="material-icons medium">keyboard_arrow_up</i>
                  </a>
                </div>
                <div id="height-down" class="row">
                  <a href class="vote-btn" @click.prevent="vote('down', questionPage._id)">
                    <i class="material-icons medium">keyboard_arrow_down</i>
                  </a>
                </div>
              </div>
              <div class="col s10">
                <p id class="left-align" v-html="questionPage.content"></p>
              </div>
            </div>
          </div>
          <div class="col s12" id>
            <div class="row">
              <div class="col s1">
                <div class="boxed">
                  <div class="vote">
                    <p>
                      {{ questionPage.totalVotes }}
                      <br>votes
                    </p>
                  </div>
                </div>
              </div>
              <div class="col s1">
                <div id="answer" class="boxed">
                  <div class="vote">
                    <p>
                      {{ questionPage.answers.length }}
                      <br>answers
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="userId === questionPage.userId._id" class="col s2 offset-s6">
                <div id="edit-button">
                  <routerLink id="edit" href :to="'/editQuestion/'+ questionPage._id">
                    <h6>edit</h6>
                  </routerLink>
                </div>
              </div>
              <div v-if="userId === questionPage.userId._id" class="col s2">
                <div id="cancel-button">
                  <a id="cancel" href @click.prevent="deleteQuestion">
                    <h6>delete</h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            id="questions"
            class="col s12"
            v-for="answer in questionPage.answers"
            :key="answer._id"
          >
            <Answer :answer="answer" :allData="questionPage"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <form @submit.prevent="submitAnswer">
        <div class="col s12">
          <h4>Your Answer</h4>
        </div>
        <div class="col s12">
          <div class="row">
            <div class="input-field col s8 offset-s2">
              <ckeditor :editor="editor" v-model="answerContent" :config="editorConfig"></ckeditor>
            </div>
          </div>
          <div class="container">
            <div class="err-msg" v-if="err">
              <h6 class="no-margin">{{ errMsg }}</h6>
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Answer from "@/components/Answer.vue";
import serverAPI from "@/API/serverAPI";

export default {
  name: "question-detail",
  components: {
    Answer
  },
  data() {
    return {
      clickedUp: false,
      clickedDown: false,
      votes: 0,
      answerContent: "",
      editor: ClassicEditor,
      editorConfig: {},
      isOwner: false,
      questionId: 0,
      userId: 0,
      errMsg: "",
      err: false
    };
  },
  computed: mapState(["questionPage"]),
  created() {
    this.userId = localStorage.getItem("userId");
    this.questionId = this.$route.params.id;
    this.$store.dispatch("getQuestion", {
      questionId: this.$route.params.id
    });
  },
  methods: {
    deleteQuestion() {
      serverAPI
        .delete(`/questions/${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(successDelete => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },

    submitAnswer() {
      console.log("masuk ke submit answer", this.questionPage._id)
      serverAPI
        .post(
          `/answers`,
          {
            content: this.answerContent,
            userId: localStorage.getItem("userId"),
            questionId: this.questionPage._id
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(postedAnswer => {
          console.log(postedAnswer.data, "===========");
          this.$store.dispatch("getQuestion", {
            questionId: this.$route.params.id
          });
          this.answerContent = "";
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push("/login");
          }
          console.log(err);
        });
    },

    vote(direction, id) {
      console.log(id, direction, "dalem voteeeeeee");
      if (direction === "up" && this.clickedUp !== true) {
        serverAPI
          .patch(
            `/questions/vote/${this.$route.params.id}`,
            {
              userId: localStorage.getItem("userId"),
              vote: "true"
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(votedUp => {
            console.log("success vote up");
            this.clickedUp = true;
            this.clickedDown = false;
            this.votes += 1;
            this.questionPage.totalVotes += 1;
            this.$router.push(`/question/${this.$route.params.id}`);
          })
          .catch(err => {
            console.log(err);
          });

        console.log(this.votes);
      } else if (direction === "down" && this.clickedDown !== true) {
        serverAPI
          .patch(
            `/questions/vote/${this.$route.params.id}`,
            {
              userId: localStorage.getItem("userId"),
              vote: "false"
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(votedUp => {
            console.log("success vote down");
            this.clickedDown = true;
            this.clickedUp = false;
            this.votes -= 1;
            this.questionPage.totalVotes -= 1;
            this.$router.push(`/question/${this.$route.params.id}`);
          })
          .catch(err => {
            console.log(err);
          });
        console.log(this.votes);
      }
    }
  }
};
</script>

<style scoped>
#main-content {
  border-left: 1px rgb(190, 190, 190) solid;
}

#questions {
  /* border-bottom: 1px rgb(190, 190, 190) solid; */

  border-top: 1px rgb(190, 190, 190) solid;
}

.boxed {
  border: 1px solid rgb(50, 145, 50);
  border-radius: 4px;
  height: 3.5rem;
  width: 4.5rem;
  /* top: 3px; */
  margin-top: 1.3rem;
  margin-left: 1.3rem;
  color: rgb(50, 145, 50);
}

.vote {
  position: relative;
  bottom: 9px;
}

.question {
  margin-top: 2.5rem;
  /* margin-left: 6rem; */
  text-align: left;
}

.title {
  margin-top: 4rem;
  margin-bottom: 4rem;
  font-size: 2rem;
}

#answer {
  margin-left: 3rem;
}

.bottom {
  border-bottom: 1px rgb(190, 190, 190) solid;
}

#question-content {
  position: relative;
  /* top: rem; */
  bottom: 2rem;
}

.vote-btn {
  color: black;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.vote-btn:hover {
  color: grey;
}

#height-up {
  height: 2rem;
}

#height-mid {
  height: 0.8rem;
}

#height-down {
  height: 1rem;
}

#main {
  padding-top: 2rem;
}

#infos {
  height: 6rem;
}

#cancel-button {
  border: 1px black solid;
  ransition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.4s ease-in;
}

#cancel-button:hover {
  background-color: rgb(206, 0, 0);
  color: white;
}

#cancel {
  color: black;
  font-weight: 3px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#cancel:hover {
  color: white;
}
#edit-button {
  border: 1px black solid;
  ransition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.4s ease-in;
}

#edit-button:hover {
  background-color: grey;
  color: white;
}

#edit {
  color: black;
  font-weight: 3px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#edit:hover {
  color: white;
}
.err-msg {
  color: white;
  font-size: 1rem;
  background-color: #ca0029;
}

.no-margin {
  margin-bottom: 2rem;
  border-radius: 3%;
  padding: 0px 7px;
}
</style>



<template>
  <div class="row">
    <div id="vote" class="col s2">
      <div id="height-up" class="row">
        <a class="vote-btn" href @click.prevent="vote('up', answer._id)">
          <i class="material-icons">keyboard_arrow_up</i>
        </a>
      </div>
      <div id="height-mid" class="row">
        <p>{{ totalVotes }}</p>
      </div>
      <div id="height-down" class="row">
        <a href class="vote-btn" @click.prevent="vote('down', answer._id)">
          <i class="material-icons">keyboard_arrow_down</i>
        </a>
      </div>
    </div>
    <div class="col s8 offset-s2">
      <div class="question">
        <h6 v-html="answer.content"></h6>
        <p class="right-align">Answered by: {{ answer.userId.name }}</p>
      </div>
    </div>
    <div class="col s2 offset-s8" v-if="isOwner">
      <router-link :to="'/editanswer/' +answer._id">
        <small>edit</small>
      </router-link>
      <a href style="margin-left: 1rem;" @click.prevent="deleteAnswer">
        <small>delete</small>
      </a>
    </div>
  </div>
</template>

<script>
import serverAPI from "@/API/serverAPI";

export default {
  name: "Answer",
  data() {
    return {
      clickedUp: false,
      clickedDown: false,
      votes: 0,
      isOwner: false,
      answerId: 0,
      totalVotes: 0
    };
  },
  props: ["answer", "allData"],
  created() {
    this.votes = this.answer.votes.length;
    this.answerId = this.answer._id;
    this.totalVotes = 0;
    this.answer.votes.map(e => {
      if (e.status === true) {
        questionFound.data.totalVotes += 1;
      } else if (e.status === false) {
        questionFound.data.totalVotes -= 1;
      }
    });
    if (this.answer.userId._id === localStorage.getItem("userId")) {
      this.isOwner = true;
    }
  },
  methods: {
    deleteAnswer() {
      serverAPI
        .delete(`/answers/${this.answerId}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(deleted => {
          this.$store.dispatch("getQuestion", {
            questionId: this.$route.params.id
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    vote(direction, id) {
      console.log(id, direction, "dalem voteeeeeee");
      if (direction === "up" && this.clickedUp !== true) {
        serverAPI
          .patch(
            `/answers/vote/${this.answerId}`,
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
            this.totalVotes += 1;
            this.$store.dispatch("getQuestion", {
              questionId: this.$route.params.id
            });
          })
          .catch(err => {
            console.log(err);
          });

        console.log(this.votes);
      } else if (direction === "down" && this.clickedDown !== true) {
        serverAPI
          .patch(
            `/answers/vote/${this.answerId}`,
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
            this.totalVotes -= 1;
            this.$store.dispatch("getQuestion", {
              questionId: this.$route.params.id
            });
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

<style>
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
  height: 1rem;
}

#height-mid {
  height: 0.8rem;
}

#height-down {
  height: 1rem;
}

#vote {
  margin-top: 2rem;
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

small {
  font-size: 88%;
}
</style>

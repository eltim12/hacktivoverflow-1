<template>
  <div class="row">
    <div class="col s1">
      <div class="boxed">
        <div class="vote">
          <p>
            {{ totalVotes }}
            <br>votes
          </p>
        </div>
      </div>
    </div>
    <div class="col s1">
      <div id="answer" class="boxed">
        <div class="vote">
          <p>
            {{ question.answers.length }}
            <br>answer
          </p>
        </div>
      </div>
    </div>
    <div class="col s8 offset-s2">
      <div class="row">
        <div class="col s12">
          <div class="question">
            <router-link :to="'/question/' +question._id">
              <h6 style="color: black;">{{ question.title }}</h6>
            </router-link>
          </div>
        </div>
        <div class="col s12 left" style="text-align: left;">
          <div class="chip" v-for="(tag, index) in question.tags" :key="index">
            <a class="tag" href @click.prevent="searchTag(tag)">{{ tag }}</a>
            <a href></a>
          </div>
        </div>
        <div class="col s12" style="text-align: right;" v-if="userId === question.userId._id">
          <router-link :to="'/editquestion/' +question._id">
            <small>edit</small>
          </router-link>
          <a href style="margin-left: 1rem;" @click.prevent="deleteQuestion(question._id)">
            <small>delete</small>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import serverAPI from "@/API/serverAPI";


export default {
  name: "Question",
  data() {
    return {
      totalVotes: 0,
      userId: localStorage.getItem("userId")
    };
  },
  props: ["question"],
  mounted() {
    this.question.votes.map(e => {
      if (e.status === true) {
        this.totalVotes += 1;
      } else if (e.status === false) {
        this.totalVotes -= 1;
      }
    });
  },
  methods: {
    searchTag(name) {
      this.$router.push(`/tag/${name}`);
    },

    deleteQuestion(id) {
      serverAPI
        .delete(`/questions/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(successDelete => {
          console.log(successDelete)
          this.$emit('deleted')
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
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
  margin-top: 1.3rem;
  /* margin-left: 6rem; */
  text-align: left;
}

.title {
  margin-top: 3rem;
  margin-bottom: 4rem;
  font-size: 3rem;
}

#answer {
  margin-left: 3rem;
}

.bottom {
  border-bottom: 1px rgb(190, 190, 190) solid;
}

.chip {
  background-color: #dfeaf4;
  border-radius: 6px;
}

#main {
  padding-top: 3.3rem;
}

small {
  font-size: 88%;
}
</style>

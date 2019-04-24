<template>
  <div id="main" class="container center">
    <div class="row">
      <div id="main-content" class="col s6 offset-s3">
        <div class="row left">
          <div class="col s12">
            <div class="container left">
              <div class="title">
                <h5 class="title">[{{ search }}]</h5>
              </div>
            </div>
          </div>
          <div
            id="questions"
            class="col s12"
            v-for="(question, index) in allQuestions"
            :key="index"
          >
            <Question :question="question"/>
          </div>
        </div>
      </div>
      <WatchedTag/>
    </div>
  </div>
</template>

<script>
import Question from "@/components/Question.vue";
import serverAPI from "@/API/serverAPI";
import WatchedTag from "@/components/WatchedTag.vue";

export default {
  name: "home",
  components: {
    Question,
    WatchedTag
  },
  data() {
    return {
      allQuestions: [],
      allAnswers: [],
      search: ""
    };
  },
  methods: {
    fetchQuestionsByTag() {
      this.search = this.$route.params.name;
      console.log(this.$route.params.name, "=========");
      let totalVote = 0;
      serverAPI
        .get(`/questions/tag/?tags=${this.$route.params.name}`)
        .then(questions => {
          this.allQuestions = questions.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.fetchQuestionsByTag();
  },
  watch: {
    $route() {
      this.fetchQuestionsByTag();
    }
  }
};
</script>

<style scoped>
#main-content {
  border-left: 1px rgb(190, 190, 190) solid;
}

#questions {
  border-top: 1px rgb(190, 190, 190) solid;
}

.row {
  margin-bottom: 0px;
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

#main {
  padding-top: 3.3rem;
}

.card-title {
  font-size: 19px;
}

.chip {
  background-color: #dfeaf4;
  border-radius: 6px;
}

.tag {
  color: #3969a0;
}
</style>
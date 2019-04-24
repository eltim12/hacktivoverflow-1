import Vue from "vue";
import Vuex from "vuex";
import Swal from "sweetalert2";
import router from "./router";
import serverAPI from "@/API/serverAPI";

Vue.use(Vuex);

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000
});

export default new Vuex.Store({
  state: {
    isLogin: false,
    userId: 0,
    questionId: 0,
    questionPage: {
      userId: {},
      answers: []
    }
  },
  mutations: {
    setUserStatus(state, payload) {
      state.isLogin = payload.status;
      state.userId = localStorage.getItem("userId");
    },

    postQuestion(state, payload) {
      state.questionPage = {};
      state.questionPage = payload.question;
    },

    postAnswers(state, payload) {
      state.questionPage.answers = [];
      state.questionPage.answers = payload.answers;
    },

    postCurrentQuestion(state, payload) {
      state.questionId = payload.id;
    }
  },
  actions: {
    notif({ commit }, { type, message }) {
      Toast.fire({
        type: type,
        text: message
      });
    },

    loginStatus({ commit }) {
      commit("setUserStatus", {
        status: true
      });
    },

    logout({ commit }) {
      localStorage.clear();
      commit("setUserStatus", {
        status: false
      });
      router.push('/login')
    },

    getQuestion({ commit }, { questionId }) {
      serverAPI
        .get(`/questions/${questionId}`)
        .then(questionFound => {
          questionFound.data.totalVotes = 0;
          questionFound.data.votes.map(e => {
            if (e.status === true) {
              questionFound.data.totalVotes += 1;
            } else if (e.status === false) {
              questionFound.data.totalVotes -= 1;
            }
          });
          commit("postQuestion", {
            question: questionFound.data
          });
          router.push(`/question/${questionId}`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});

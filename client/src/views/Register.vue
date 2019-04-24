<template>
  <div id="main" class="container center">
    <div class="card">
      <div id="form" class="container">
        <div class="row">
          <form class="col s10 offset-s1" @submit.prevent="register">
            <h4 class>Register</h4>
            <div class="row">
              <div class="input-field col s12">
                <input id="input-username" type="text" class="validate" v-model="username">
                <label for="username">Fullname</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="input-email" type="text" class="" v-model="email">
                <label for="email_inline">Email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="input-password" type="password" class="validate" v-model="password">
                <label for="password">Password</label>
              </div>
            </div>
            <div class="err-msg" v-if="err">
              <p class="no-margin">{{ errMsg }}</p>
            </div>
            <div class="row">
              <button
                id="submit-button"
                type="submit"
                class="waves-effect waves-light white grey-text text-darken-2 btn"
              >
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import serverAPI from "@/API/serverAPI";

export default {
  name: "regisrer",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errMsg: "",
      err: false
    };
  },
  methods: {
    register() {
      serverAPI
        .post("users", {
          name: this.username,
          email: this.email,
          password: this.password
        })
        .then(createdUser => {
          this.$store.dispatch("notif", {
            type: "success",
            message: "register success"
          });
          this.$router.push("/login");
        })
        .catch(err => {
          this.errMsg = err.response.data.msg;
          this.err = true;
        });
    }
  }
};
</script>

<style scoped>
.card {
  width: 30rem;
  margin-left: 32.5%;
}

#form {
  margin-top: 12rem;
}

#submit-button {
  font-weight: lighter;
  width: 8rem;
  /* margin-bottom: 2rem; */
}

#submit-button:hover {
  width: 10rem;
}

#input-username:focus {
  border-bottom: 1px solid rgb(255, 119, 35);
  box-shadow: 0 1px 0 0 rgb(255, 119, 35);
}

#input-username:focus + label {
  color: rgb(255, 119, 35);
}

#input-email:focus {
  border-bottom: 1px solid rgb(255, 119, 35);
  box-shadow: 0 1px 0 0 rgb(255, 119, 35);
}

#input-email:focus + label {
  color: rgb(255, 119, 35);
}

#input-password:focus {
  border-bottom: 1px solid rgb(255, 119, 35);
  box-shadow: 0 1px 0 0 rgb(255, 119, 35);
}

#input-password:focus + label {
  color: rgb(255, 119, 35);
}

span {
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

span:hover {
  color: grey;
}

#main {
  padding-top: 3.3rem;
}

.err-msg {
  color: white;
  font-size: 1rem;
  background-color: #ca0029;
}

.no-margin {
  margin-bottom: 2rem;
  border-radius: 3%;
}

</style>

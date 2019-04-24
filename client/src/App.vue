<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import serverAPI from "@/API/serverAPI.js";

export default {
  components: {
    Navbar
  },
  name: "app",
  created() {
    if (localStorage.getItem("token")) {
      this.verify();
    } else {
      this.$store.commit("setUserStatus", {
        status: false
      });
    }
  },
  methods: {
    verify() {
      serverAPI
        .post(
          "/users/verify",
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(verified => {
          this.$store.commit("setUserStatus", {
            status: true
          });
        })
        .catch(err => {
          this.$store.commit("setUserStatus", {
            status: false
          });
          localStorage.clear();
        });
    }
  }
};
</script>

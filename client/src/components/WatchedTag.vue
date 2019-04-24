<template>
  <div class="col s3 mt-custom">
    <div class="card white">
      <div class="card-content black-text">
        <div class="row">
          <div class="col s8">
            <span class="card-title">Watched Tags</span>
          </div>
          <div class="col s4">
            <a href style="float: right" @click.prevent="triggerInput">edit</a>
          </div>
        </div>
        <div class="chip" v-for="(tag, index) in myTags" :key="index">
          <a class="tag" href @click.prevent="searchTag(tag.name)">{{tag.name}}</a>
          <a href @click.prevent="removeTag(tag._id)">
            <i class="close material-icons">close</i>
          </a>
        </div>
      </div>
      <div class="row" v-if="showInput">
        <div class="col s8 offset-s2">
          <form @submit.prevent="addTag">
            <div class="input-field">
              <input id="input" type="text" class="validate" v-model="tagname">
              <label for="input">new tag</label>
            </div>
            <div class="err-msg" v-if="err">
              <p class="no-margin">{{ errMsg }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serverAPI from "@/API/serverAPI";
import VoerroTagsInput from "@voerro/vue-tagsinput";

export default {
  data() {
    return {
      selectedTags: [],
      showInput: false,
      myTags: [],
      tagname: "",
      errMsg: "",
      err: false
    };
  },
  created() {
    console.log("from watched tag====");
    serverAPI
      .get(`/users/${localStorage.getItem("userId")}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(userInfo => {
        this.myTags = userInfo.data.watchedTags;
        console.log(userInfo.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    triggerInput() {
      if (this.showInput === false) {
        this.showInput = true;
      } else if (this.showInput === true) {
        this.showInput = false;
      }
    },
    removeTag(tagId) {
      serverAPI
        .patch(
          `/users/watchedTag/${localStorage.getItem("userId")}`,
          {
            tagId,
            action: "remove"
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(deleted => {
          console.log(deleted.data.watchedTags);
          this.myTags = deleted.data.watchedTags;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTag() {
      serverAPI
        .patch(
          `/users/watchedTag/${localStorage.getItem("userId")}`,
          {
            tagname: this.tagname,
            action: "add"
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(added => {
          this.myTags = added.data.watchedTags;
          this.tagname = "";
          this.err = false;
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push("/login");
          } else {
            this.errMsg = err.response.data.msg;
            this.err = true;
          }
          console.log(err);
        });
    },
    searchTag(name) {
      this.$router.push(`/tag/${name}`);
    }
  }
};
</script>

<style>

.mt-custom {
  margin-top: 2.6rem;
}

#input:focus {
  border-bottom: 1px solid rgb(255, 119, 35);
  box-shadow: 0 1px 0 0 rgb(255, 119, 35);
}

#input:focus + label {
  color: rgb(255, 119, 35);
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

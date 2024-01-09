<template>
  <div style="height: 100vh">
    <header-vue />
    <div class="container d-flex align-items-center flex-column mt-4">
      <div @mouseover="showInput" @mouseout="hideInput" style="width: 350px; height: 350px" class="">
        <img id="avatar" style="width: 100%; height: 100%; border-radius: 100%; border: 2px solid;" :src="avatar" alt="Avatar">
        <div class="d-flex justify-content-center" style="margin-top: -50px;">
            <input style="display: none;" type="file" accept="image/*" @change="updateAvatar($event)" id="file-input"/>
            <label id="label" for="file-input">Update</label>
        </div>
      </div>
      <div class="m-4">
        <h4 style="text-align: center; font-weight: 700">{{ username }}</h4>
        <i style="text-align: center; opacity: 0.8">{{ email }}</i>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderVue from "./Header.vue";
import { getUserInfo } from "../services/services";
import { uploadImage } from "../services/services";

export default {
  name: "Profile",
  components: { HeaderVue },
  data() {
    return {
      username: "",
      email: "",
      avatar: "https://app-tech-blogs-backend.herokuapp.com/file/image/1660655959253-avatar.png",
    };
  },
  methods: {
    showInput() {
        document.getElementById('label').style.visibility = 'visible';
    },
    hideInput() {
        document.getElementById('label').style.visibility = 'hidden';
    },
    updateAvatar(event) {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        try {
            uploadImage(formData).then((res) => {
            if (res.status != 200) {
                this.$bvModal.msgBoxOk("Upload image fail!", {
                size: "sm",
                buttonSize: "sm",
                centered: true,
                });
            } else {
                this.avatar = res.data.url;
            }
            });
        } catch (error) {
            this.$bvModal.msgBoxOk(error.message, {
            size: "sm",
            buttonSize: "sm",
            centered: true,
            });
        }
    }
  },
  created() {
    getUserInfo(this.$route.params.id).then((res) => {
      if (res.status == 200) {
        this.username = res.data.username;
        this.email = res.data.email;
        this.avatart = res.data.email ? res.data.email : "";
      }
    });
  }

  
};
</script>

<style>
label {
    color: white;
    cursor: pointer;
    font: 1.5em sans-serif;
    visibility: hidden;
}
</style>
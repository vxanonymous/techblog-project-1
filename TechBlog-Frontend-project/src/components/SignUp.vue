<template>
  <div>
    <div id="container" class="d-flex">
      <div id="loginImage"></div>
      <div id="loginForm" class="d-flex flex-column justify-content-center">
        <h1>Sign Up to TechBlog</h1>
        <b-row class="my-1 mb-3">
          <b-col>
            <b-form-input
              :state="validateEmail"
              id="`type-email"
              type="email"
              placeholder="Email"
              v-model="email"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateEmail"
              >Invalid email</b-form-invalid-feedback
            >
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <b-form-input
              :state="validateUsername"
              id="username"
              type="text"
              placeholder="Username"
              v-model="username"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateUsername"
              >Invalid username: at least 4 characters, max 10 characters, no
              special characters</b-form-invalid-feedback
            >
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <b-form-input
              :state="validatePassword"
              id="`type-password"
              type="password"
              placeholder="Password"
              v-model="password"
            ></b-form-input>
            <b-form-invalid-feedback :state="validatePassword"
              >Invalid password: at least 8 characters, 1uppercase, 1 lowercase,
              1number!</b-form-invalid-feedback
            >
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <b-form-input
              :state="validateRetypePassword"
              id="`type-password"
              type="password"
              placeholder="Typing your password again"
              v-model="retypePassword"
            ></b-form-input>
            <b-form-invalid-feedback :state="validateRetypePassword"
              >RetypePassword and Password must be the
              same</b-form-invalid-feedback
            >
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col class="d-flex justify-content-center">
            <b-button class="w-100" variant="outline-primary" @click="signup"
              >Signup</b-button
            >
          </b-col>
        </b-row>
        <div class="mt-2">
          Already have an account?
          <a href="#/login" style="text-decoration: none">Login</a>.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from "../services/services";
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      retypePassword: "",
      validateEmail: null,
      validatePassword: null,
      validateUsername: null,
      validateRetypePassword: null,
    };
  },
  methods: {
    signup() {
      this.validateInputEmail();
      this.validateInputPassword();
      this.validateInputUsername();
      this.validateInputRetypePassword();
      if (
        this.validateEmail &&
        this.validatePassword &&
        this.validateUsername &&
        this.validateRetypePassword
      ) {
        const user = {
          email: this.email,
          password: this.password,
          username: this.username,
        };
        registerUser(user).then((res) => {
          if (res.status == 200) {
            this.$bvModal
              .msgBoxOk("Successfully!", {
                size: "sm",
                buttonSize: "sm",
                okVariant: "success",
                centered: true,
              })
              .then(() => {
                this.$router.push({ name: "Login" });
              });
          } else if (res.status == 302) { //The email is duplicated.
            this.$bvModal.msgBoxOk(res.body.message, {
              size: "sm",
              buttonSize: "sm",
              centered: true,
            });
          } else {
            this.$bvModal.msgBoxOk("Error, can not create an account!", {
              size: "sm",
              buttonSize: "sm",
              centered: true,
            });
          }
        }).catch((err) => {
            this.$bvModal.msgBoxOk(err.message, {
                size: 'sm',
                buttonSize: 'sm',
                centered: true
            })
        });
      }
    },
    validateInputEmail() {
      const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.validateEmail = emailReg.test(this.email);
    },
    validateInputPassword() {
      const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      this.validatePassword = passwordReg.test(this.password);
    },
    validateInputUsername() {
      const usernameReg = /^[a-zA-Z0-9]{4,10}$/;
      this.validateUsername = usernameReg.test(this.username);
    },
    validateInputRetypePassword() {
      if (this.password != "" && this.retypePassword != "") {
        if (this.password == this.retypePassword) {
          this.validatePassword = true;
          this.validateRetypePassword = true;
        } else {
          this.validateRetypePassword = false;
        }
      } else {
        this.validateRetypePassword = false;
      }
    },
  },
};
</script>

<style>
    #loginImage {
        background-image: url('../assets/login-bg.png');
        background-size: cover;
        width: 70%;
        height: 100vh;
    }
    #signupForm {
        width: 40%;
        padding-right: 20px;
        padding-left: 20px;
    }
</style>
<template>
  <div>
    <div id="container" class="d-flex">
        <div id="loginImage"></div>
        <div id="loginForm"  class="d-flex flex-column justify-content-center">
            <h4>Sign In to TechBlog</h4>
            <b-row class="my-1">
                <b-col>
                    <b-form-input :state="validateEmail" id="`type-email" type="email" placeholder="Email" v-model="email"></b-form-input>
                    <b-form-invalid-feedback :state="validateEmail">Invalid email!</b-form-invalid-feedback>
                </b-col>
            </b-row>
            <b-row class="mb-2">
                <b-col>
                    <b-form-input :state="validatePassword" id="`type-password" type="password" placeholder="Password" v-model="password"></b-form-input>
                    <b-form-invalid-feedback :state="validatePassword">Invalid password: at least 8 characters, 1 uppercase, 1 lowercase, 1 number!</b-form-invalid-feedback>
                </b-col>
            </b-row>
            <div class="mb-2">
                <b-form-checkbox v-model="isRemember" value="true" unchecked-value="false" @change="rememberMe">Remember me</b-form-checkbox>
            </div>
            <b-row>
                <b-col class="d-flex justify-content-center">
                    <b-button class="w-100" variant="outline-primary" @click="login">Login</b-button>
                </b-col>
            </b-row>
            <div class="mt-2">New to GitHub? <a href="#/signup" style="text-decoration: none;">Create an account</a>.</div>
        </div>
    </div>
  </div>
</template>

<script>
import {loginService} from '../services/services';
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            validateEmail: null,
            validatePassword: null,
            isRemember: false
        }
    },
    methods: {
        login() {
            this.validateInputEmail();
            this.validateInputPassword();
            if (this.validateEmail && this.validatePassword) {
                const user = {
                    email: this.email,
                    password: this.password
                };

                loginService(user).then((res) => {
                    if (res.status == 200) {
                        localStorage.setItem('token', res.data);
                        this.$bvModal.msgBoxOk("Login successfully!", {
                            size: 'sm',
                            buttonSize: 'sm',
                            okVariant: 'success',
                            centered: true
                        })
                        .then(()=>{this.$router.back()})
                    } else if (res.status == 422) {
                        this.$bvModal.msgBoxOk(res.body.message, {
                            size: 'sm',
                            buttonSize: 'sm',
                            centered: true
                        })
                    } else if (res.status == 423) {
                        this.$bvModal.msgBoxOk(res.body.message, {
                            size: 'sm',
                            buttonSize: 'sm',
                            centered: true
                        })
                    } else {
                        this.$bvModal.msgBoxOk("Login fail!", {
                            size: 'sm',
                            buttonSize: 'sm',
                            centered: true
                        })
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
            const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.validateEmail = emailReg.test(this.email);
        },

        validateInputPassword() {
            const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            this.validatePassword = passwordReg.test(this.password);
        },

        rememberMe() {
            localStorage.setItem('rememberme', this.isRemember);

            if (this.isRemember == 'true') {
                localStorage.setItem('email', this.email);
            } else {
                localStorage.removeItem('email');
            }
        }
    },
    created() {
        const isRememberMe = localStorage.getItem('rememberme');
        this.isRemember = isRememberMe;

        if (isRememberMe) {
            this.email = localStorage.getItem('email');
        }
    }
}
</script>

<style>
    #loginImage {
        background-image: url('../assets/login-bg.png');
        background-size: cover;
        width: 70%;
        height: 100vh;
    }
    #loginForm {
        width: 40%;
        padding-right: 20px;
        padding-left: 20px;
    }
</style>
<script>
// Import the functions you need from the SDKs you need
import {  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js" //GoogleAuthProvider, signInWithPopup


import { Modal } from "bootstrap";

import { firebaseCreateAccount, firebaseLogin, firebaseReturnAuth, firebaseSetPersistance, firebaseSignInWithGoogle } from "../firebase";

// Initialize Firebase
const auth = firebaseReturnAuth()

export default {
    created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.$router.push({ name: "Dashboard" }) //Successful Login
            }
        })
        window.addEventListener("keydown", (event) => { if (event.key == "Enter") { this.attempt_login() } }) //Login via Enter
    },

    data: () => {
        return {
            email_data: "",
            password_data: "",

            remember_me: false,

            errorBool: false,
            errorText: "",
        }
    },

    methods: {
        attempt_login: async function () {
            this.email_data = this.email_data.trim() //Manage in firebase.js
            firebaseCreateAccount(this.email_data, this.password_data)
                .catch(error => {
                    this.errorBool = true
                    if (error.toString() == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
                        this.login()

                    }
                    else if (error.toString() == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).") {
                        this.errorText = "Your password should be at least 6 characters long. Try again."
                        this.openModal()
                    }
                    else if (error.toString() == "FirebaseError: Firebase: Error (auth/invalid-email).") {
                        this.errorText = "This is not a valid email. Try again."
                        this.openModal()
                    }
                    else {
                        this.errorText = error.toString()
                        this.openModal()
                    }
                })
                .then(() => {
                    if (!this.errorBool) this.login()
                })
        },
        login: async function () {
            if (this.remember_me) { await firebaseSetPersistance("RememberMe") }
            else { await firebaseSetPersistance("noRememberMe") }
            firebaseLogin(this.email_data, this.password_data)
                .catch((error) => {
                    if (error.toString() == "FirebaseError: Firebase: Error (auth/invalid-login-credentials).") {
                        this.errorText = "Invalid Credentials, try again" //Incorrect details
                        this.openModal()
                    }
                    else {
                        console.log(error.toString())
                    }
                })
        },

        login_with_google: async function(){
          if (this.remember_me) { await firebaseSetPersistance("RememberMe") }
          else { await firebaseSetPersistance("noRememberMe") }
          firebaseSignInWithGoogle()
              .catch((error) => {
                if (error.toString() == "FirebaseError: Firebase: Error (auth/invalid-login-credentials).") {
                  this.errorText = "Invalid Credentials, try again" //Incorrect details
                  this.openModal()
                }
                else {
                  console.log(error.toString())
                }
              })
        },

        openModal: function () {
            let modal = Modal.getOrCreateInstance('#errorModal', {})
            modal.show()
        }
    }
}
</script>

<template>
    <div id="Page">
        <div id="Login" class="card p-1 justify-content-center">
            <div class="card-header">
                <h1 id="Title">Anchor</h1>
            </div>
            <div class="card-body">

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Email</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="email_data"
                        maxlength="64">
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Password</span>
                    <input type="password" class="form-control" aria-describedby="basic-addon1" v-model="password_data"
                        maxlength="64">
                </div>

                <div class="btn-group" role="group" id="form_loginButtons">
                    <button type="button" class="btn btn-light" @click="login">Login</button>
                    <button type="button" class="btn btn-light" @click="attempt_login">Sign-up</button>
                </div>

                <div class="btn-group" role="group" id="form_loginButtons">
                  <button type="button" class="btn btn-light" @click="login_with_google">Login with Google</button>
                </div>

                <div class="form-check" id="form_rememberMe">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexCheckDefault" :value="remember_me"
                        :checked="remember_me" v-model="remember_me">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Remember Me</label>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="errorModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">Whoops.... Something went wrong</div>
                </div>
                <div class="modal-body">
                    <p>{{ errorText }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Okay</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#Page {
    height: 100vh;
    width: 100vw;

    background-color: var(--secondary-colour);

    display: flex;
    justify-content: center;
    align-items: center;
}

#Login {
    background-color: var(--primary-colour);
    width: 25%;
}

#Title {
    color: var(--text-colour);

    text-align: center;

    letter-spacing: 2px;
}

#form_loginButtons {
    width: 100%;

    margin-top: 4px;
}

#form_rememberMe {
    align-self: start;

    padding-top: 5px;
    padding-bottom: 20px;

    color: var(--text-colour);
}

@media only screen and (max-width : 600px) {
    #Login {
        width: 90%;
    }

    .logins {
        font-size: 4vw;

        width: 100%;
    }


}
</style>
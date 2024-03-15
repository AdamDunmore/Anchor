<template>
    <div id="settings_div">
        <h2>Settings</h2>
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" :checked="dark_mode"
                @click="() => { changeTheme(true) }">
            <label class="form-check-label" for="flexSwitchCheckDefault">Dark Mode</label>
        </div>
        <button class="btn btn-primary w-50" @click="logout">Log out</button>
    </div>
</template>

<script>
import userIDStore from '../stores/userid'
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyDJybtBVlBPZs80Tip-6buGfZr-TT8U2fo",
    authDomain: "tuesday-920c6.firebaseapp.com",
    projectId: "tuesday-920c6",
    storageBucket: "tuesday-920c6.appspot.com",
    messagingSenderId: "840991250435",
    appId: "1:840991250435:web:d116a93daab1cef677d636",
    measurementId: "G-DJ8QN6LY7R"
};

export default {
    mounted: function () {
        this.initialize()
    },
    data: () => {
        return {
            dark_mode: false
        }
    },
    methods: {
        initialize() {
            if (localStorage.length == 0) {
                localStorage.setItem("dark_mode", this.dark_mode)
            }
            else {
                this.dark_mode = (localStorage.getItem("dark_mode") === "true")
                this.changeTheme(false)
            }
        },
        changeTheme(bool) {
            if (bool) {
                this.dark_mode = !this.dark_mode
                localStorage.setItem("dark_mode", this.dark_mode)
            }
            const root = document.querySelector(':root')
            if (this.dark_mode == true) {
                root.style.setProperty("--primary-colour", '#303050')
                root.style.setProperty("--primary-colour-hover", '#202040')
                root.style.setProperty("--secondary-colour", '#303040')
                root.style.setProperty("--tertiary-colour", '#0055AA')
                root.style.setProperty("--tertiary-colour-hover", '#003388')
                root.style.setProperty("--quaternary-colour", '#1D263B')

                root.style.setProperty("--text-colour", '#ffffff')
                root.style.setProperty("--text-colour-alt", '#DDDDDD')
                root.style.setProperty("--border-colour", '#1D263B')

            }
            else {
                root.style.setProperty("--primary-colour", '#1C75BC')
                root.style.setProperty("--primary-colour-hover", '#1863A0')
                root.style.setProperty("--secondary-colour", '#FFFBFA')
                root.style.setProperty("--tertiary-colour", '#59B1A6')
                root.style.setProperty("--tertiary-colour-hover", '#3B7D75')
                root.style.setProperty("--quaternary-colour", '#1D263B')

                root.style.setProperty("--text-colour", '#ffffff')
                root.style.setProperty("--text-colour-alt", '#000000')
                root.style.setProperty("--border-colour", '#19639F')
            }
        },
        logout : function(){
            let auth = getAuth()
            signOut(auth).then(() => {
                this.$router.push({ name: "Login" })
            }).catch((error) => {alert(error)})
        }
    }
}
</script>

<style>
#settings_div {
    background-color: var(--primary-colour);

    position: absolute;
    bottom: 0px;
    left: 200px;

    width: 400px;

    display: flex;
    align-items: center;
    flex-direction: column;

    overflow: hidden;

    transition: height 0.3s;

    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
}

.settings_on {
    height: 200px;
}

.settings_off {
    height: 0px;
}

.settings_row {
    display: flex;
    flex-direction: row;
}

@media only screen and (max-width: 600px) {
    #settings_div {
        left: 0px;
        width: 100%;
    }
}
</style>
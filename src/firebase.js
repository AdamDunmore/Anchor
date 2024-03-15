import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged, inMemoryPersistence } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js" //GoogleAuthProvider, signInWithPopup



const firebaseConfig = {
    apiKey: "AIzaSyDJybtBVlBPZs80Tip-6buGfZr-TT8U2fo",
    authDomain: "tuesday-920c6.firebaseapp.com",
    projectId: "tuesday-920c6",
    storageBucket: "tuesday-920c6.appspot.com",
    messagingSenderId: "840991250435",
    appId: "1:840991250435:web:d116a93daab1cef677d636",
    measurementId: "G-DJ8QN6LY7R"
};

const app = initializeApp(firebaseConfig)
let auth = getAuth(app)
let user;

auth.onAuthStateChanged((u) => {
    if (u) {user = u.uid}
});

export let firebaseReturnAuth = function(){
    return auth;
}

export let firebaseLogin = function(email, password){
    return new Promise(function( resolve, reject) {
            signInWithEmailAndPassword(auth, email, password)
                .then(p => {
                    resolve(p)
                })
                .catch(error => {
                    reject(error) 
                })
    })
}

export let firebaseCreateAccount = function(emai, password){
    return new Promise(function( resolve, reject ) {
        createUserWithEmailAndPassword(auth, emai, password)
            .then(() => {resolve()})
            .catch((error) => {reject(error)})
    })
}

export let firebaseSetPersistance = async function(type){ // type : "RememberMe" or "noRememberMe"
    if (type === "RememberMe"){
        setPersistence(auth, browserLocalPersistence)
    }
    else if (type === "noRememberMe"){
        setPersistence(auth, inMemoryPersistence)
    }
    else{
        throw Error("type not valid")
    }
} 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged, inMemoryPersistence, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js" //GoogleAuthProvider, signInWithPopup
import {  getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, query, where, updateDoc, orderBy } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"
//https://firebase.google.com/docs/web/learn-more#libraries-cdn

let getCurrentDate = function(){
    let date = new Date()
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yy = date.getFullYear()

    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} let today = dd+'/'+mm+'/'+yy;
    return today
  }

const firebaseConfig = {
    apiKey: "AIzaSyCgxESu13Te7RC-FCctB_tDls9LkmS3pGQ",
    authDomain: "anchor-e28b5.firebaseapp.com",
    projectId: "anchor-e28b5",
    storageBucket: "anchor-e28b5.appspot.com",
    messagingSenderId: "859361563792",
    appId: "1:859361563792:web:a8672f1cd40d5b0ef3b415",
  };
  
  

const app = initializeApp(firebaseConfig)
let auth = getAuth(app)
const firestore = getFirestore(app)
let user_id;
const events_collection = collection(firestore, "events")
export let current_query;

auth.onAuthStateChanged((u) => {
    if (u) {user_id = u.uid}
    current_query = query(events_collection, where("uid", "==", user_id), orderBy("completed"));
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

export let firebaseSignOut = async function(){
    let auth = firebaseReturnAuth()
    signOut(auth)
}

export let firebaseGetEvents = async function(){      
    return new Promise((resolve, reject) => {
        onSnapshot(current_query, (docs) => {
            let current_doc;
            let data = [];
            docs.forEach((doc) => { //Add test for no docs
                current_doc = doc.data()
                current_doc["id"] = doc.id
                data.push(current_doc)
            })
            resolve(data)
        }, error => {
            reject(error)
        })
    })
}

export let firebaseSetQueryUrgency = function(new_urgency){
    if (new_urgency !== 0){
        current_query = query(events_collection, where("uid", "==", user_id), where("urgency", "==", new_urgency), orderBy("completed"))
    }
    else{
        current_query = query(events_collection, where("uid", "==", user_id), orderBy("completed"));
    }
}

export let firebaseAddEvent = async function(inputDescription, inputUrgency){
    await addDoc(events_collection, {
      uid: user_id,
      description: inputDescription,
      urgency : parseInt(inputUrgency),
      dateCreated : getCurrentDate(),
      status : "Not-Started",
      completed : false
    })
}

export let firebaseRemoveEvent = async function(id){
    await deleteDoc(doc(firestore, "events", id))
}

export let firebaseUpdateEvent = async function(event_id, new_status, new_description){
    await updateDoc(doc(firestore, "events", event_id), {
        status : new_status,
        description : new_description
      })
}
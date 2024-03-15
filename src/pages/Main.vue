<script setup>
  import createEvent from "../components/createEvent.vue";
  import createEventButton from "../components/createEventButton.vue";
  import navBar from "../components/navbar.vue"
  import infoTable from "../components/infoTable.vue";
  import homeText from "../components/homeText.vue"
  import Task from "../components/task.vue";

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
  import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, query, where, updateDoc, orderBy } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"

  import { firebaseReturnAuth } from "../firebase";
</script>

<script>
  const firebaseConfig = {
      apiKey: "AIzaSyDJybtBVlBPZs80Tip-6buGfZr-TT8U2fo",
      authDomain: "tuesday-920c6.firebaseapp.com",
      projectId: "tuesday-920c6",
      storageBucket: "tuesday-920c6.appspot.com",
      messagingSenderId: "840991250435",
      appId: "1:840991250435:web:d116a93daab1cef677d636",
      measurementId: "G-DJ8QN6LY7R"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app)
  const ref = collection(firestore, "events")

  export default {
    created: function(){
      if(firebaseReturnAuth()["currentUser"] == undefined){ //Change to get auth
        this.$router.push({name: "Login"})
      }else{
        this.user = firebaseReturnAuth()["currentUser"]["uid"]
        this.data = this.viewEvents();
      }
    },

    data: () => {
      return{
        user : "",

        tab: "Home",
        makeEvent : false,

        data: [],

        noResults: false,
      }
    },
    methods: {
      currentDate : function(){
        let date = new Date()
        let dd = date.getDate()
        let mm = date.getMonth() + 1
        let yy = date.getFullYear()

        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} let today = dd+'/'+mm+'/'+yy;
        return today
      },
      viewEvents : async function(urg){
          let q;
          q = query(ref, where("uid", "==", this.user), orderBy("completed"))
            
          if (urg == "Completed"){
            q = query(ref, where("uid", "==", this.user), where("completed", "==", true))
          }
          else if (urg == 1 || urg == 2 || urg == 3 || urg == 4){
            q = query(ref, where("uid", "==", this.user), where("urgency", "==", parseInt(urg)), orderBy("completed"))
          }

          onSnapshot(q, (docs) => {
            this.data = []
            let tempData = [];
            if (docs.size != 0){
              docs.forEach((doc) => {
                tempData = doc.data()
                tempData["id"] = doc.id
                switch(tempData.urgency){
                  case 1:
                    tempData["urgency"] = "Low"
                    break;
                  case 2:
                    tempData["urgency"] = "Medium"
                    break;
                  case 3:
                    tempData["urgency"] = "High"
                    break;
                  case 4:
                    tempData["urgency"] = "Urgent"
                    break;
                }
                this.data.push(tempData)
              })
            }
          })
      },
      addEvent : async function(inputDescription, inputUrgency){
        await addDoc(ref, {
          uid: this.user,
          description: inputDescription,
          urgency : parseInt(inputUrgency),
          dateCreated : this.currentDate(),
          status : "Not-Started",
          completed : false
        })
      },
      removeEvent : async function(id){
        await deleteDoc(doc(firestore, "events", id))
      },
      updateStatus : async function(id, newStatus){
        await updateDoc(doc(firestore, "events", id), {
          status : newStatus
        })
      },
      updateCompleted : async function(id, newCompleted){
        await updateDoc(doc(firestore, "events", id), {
          completed : newCompleted
        })
      },
      changeTab : function(tab){
          this.tab = tab
      }
    }
  }
</script>

<template>
  <div id="mainDashboard">
    <navBar @changeTab="changeTab"/>
    <homeText v-if="tab === 'Home'"/>
    <div  class="board" v-if="tab === 'Tasks'">
      <Task :info="data" @remove="removeEvent" @updateS="updateStatus" @view="viewEvents"/>
    </div>
    <createEventButton v-if="makeEvent == false" @toggleMakeEvent="() => {makeEvent = true}"/>
    <createEvent :class="{makeEventOn: makeEvent, makeEventOff: !makeEvent}" :method="() => {makeEvent = false}" @newEvent="addEvent"/>
  </div>
</template>

<style>
#mainDashboard{
    background-color: var(--secondary-colour);
    color: white;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
}

.board{
  display: inline-block;
  border-radius: 6px;

  width: 95%;
  height: 97vh;

  background-color: var(--secondary-colour);

  margin: 5px;
}

@media only screen and (max-width: 600px) { /*Mobile Only*/
  #mainDashboard{
    flex-direction: column;
  }

  .board{
    height: calc(100% - 60px);
    width :calc(100% - 5px);

    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    overflow-y: scroll;
  }
}
</style>

<script setup>
  import create_event from "../components/create_event.vue";
  import navBar from "../components/navbar.vue"
  import homeText from "../components/homeText.vue"
  import Task from "../components/task.vue";

  import { firebaseReturnAuth } from "../firebase.js";
</script>

<script>
  export default {
    created: function(){
      if(firebaseReturnAuth()["currentUser"] == undefined){ //Change to get auth
        this.$router.push({name: "Login"})
      }else{
        this.user = firebaseReturnAuth()["currentUser"]["uid"]
      }
    },

    data: () => {
      return{
        user : "",

        tab: "Home",
        makeEvent : false,
      }
    },
    methods: {
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
    <div class="board" v-if="tab === 'Tasks'">
      <Task />
    </div>
    <create_event @newEvent="addEvent"/>
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

  width: 100%;
  height: 97vh;

  background-color: var(--secondary-colour);

  overflow-y: scroll;
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
  }
}
</style>

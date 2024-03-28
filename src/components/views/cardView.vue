<template>
    <div id="card_container">
        <div class="card" id="task_div" v-for="item in data">
            <div class="card-header" id="task_header">
                <p class="task_info">{{ item.dateCreated }}</p>
                <p class="task_info" id="task_urgency">{{ item.urgency }}</p>
                <select id="status_select" class="form-select form-select-sm" v-model="item.status"
                @change="this.$emit('update', item.id, item.status, item.description)">
                <option value="Not-Started" selected>Not-Started</option>
                <option value="In-Progress">In-Progress</option>
                <option value="To Discuss">To Discuss</option>
                <option value="Stuck">Stuck</option>
            </select>
            <button  id="close_button" @click="() => {deleteEvent(item.id)}">X</button>
        </div>
        <div class="card-text m-2" style="color: var(--text-colour);">
          <p @click="editing_card = item.id" v-if="editing_card !== item.id">{{ item.description }}</p>
          <textarea autofocus id="card_textarea" v-model = item.description v-if="editing_card === item.id">{{ item.description }}</textarea>
          <button id="card_editing_apply" v-if="editing_card === item.id" @click="() => {updateEvent(item.id, item.status, item.description); editing_card = 'none'}">Confirm</button>
        </div>
        </div>
    </div>
</template>

<style scoped>
    #card_container{
        width: 100%;
        height: 100%;

        overflow-y: scroll;
    }

    #task_div {
        width: 434px;
        height: 200px;

        background-color: var(--primary-colour);

        float: left;
        margin: 10px;

        transition: background-color 0.5s;
    }

    #task_div:hover {
        background-color: var(--primary-colour-hover);
    }

    #task_header {
        width: 100%;
        height: auto;

        background-color: var(--quaternary-colour);

        color: white;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .task_info{
        margin: 0px;
        margin-left: 10px;
        margin-right: 10px;
    }

    #status_select{
        margin-right: 20px;

        background-color: var(--primary-colour);
        color: var(--text-colour);

        border-width: 1px;
        border-color: var(--quaternary-colour);
    }

    #card_textarea{
      width: 100%;
      height: 100%;
      background-color: var(--primary-colour-hover);
      color: var(--text-colour);
      border: none;
      resize: none;
    }

    #card_editing_apply{
      margin-top: 4px;

      background-color: var(--quaternary-colour);
      color: var(--text-colour);

      border: none;
      border-radius: 10px;

      padding: 5px;
    }

    #close_button{
        margin-left: auto;

        color: var(--text-colour);
        background-color: #00000000;
        border: none;
    }

    @media only screen and (max-width: 600px) {
        #task_div {
            font-size: 4vw;
            width: 90%;
            min-height: 150px;
        }
        
        #card_container{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
</style>

<script>
import {firebaseUpdateEvent} from "@/firebase.js";
import {useToast} from "vue-toast-notification";

export default {
    props: {
        data : [],
        editing_card: "none"
    },
  methods: {
      updateEvent: function (id, status, description){
        firebaseUpdateEvent(id, status, description)
      },
      deleteEvent: function (id){
        useToast().success('Event deleted successfully!')
        this.$emit('remove', id)
      }
  }
}
</script>
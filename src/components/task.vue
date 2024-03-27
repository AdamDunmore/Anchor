<template>
    <div id="task_container">
        <h1 style="color: var(--text-colour-alt); margin-left: 20px;" v-if="data.length == 0">There seems to be no results, try
            another filter set or create an event with the button in the bottom right.</h1>
        <cardView :data = data @remove="remove_event" @update = "update_event" v-if="view == 'Card'"/>
        <tableView :data = data @remove="remove_event" @update = "update_event" v-if="view == 'Table'"/>
        <div id="task_side_bar">
            <filter_tasks id="filter_button" @apply_filter = "apply_filter"/>
        </div>
    </div>
</template>

<script>
import filter_tasks from "./filter_tasks.vue"
import cardView from "./views/cardView.vue"
import tableView from "./views/tableView.vue"
import { firebaseGetEvents, firebaseRemoveEvent, firebaseUpdateEvent, current_query, firebaseSetQueryUrgency } from "../firebase.js"

import { onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"

export default {
    mounted: async function () {
        this.data = await firebaseGetEvents()
        this.view_events_listener()
        if (localStorage.getItem("view") != null){
            this.view = localStorage.getItem("view")
        }
    },
    methods : {
        remove_event : function(id){
            firebaseRemoveEvent(id)
        },

        update_event : function(id, status){
           firebaseUpdateEvent(id, status)
        },

        view_events_listener : function(){
           onSnapshot(current_query, (snapshot) => { //Yet to figure out way to move this to firebase.js
                let newData = [];
                snapshot.forEach((doc) => {
                    let current_doc = doc.data();
                    current_doc["id"] = doc.id;
                    newData.push(current_doc);
                });
                this.data = newData;
            });
        },
        apply_filter : async function(new_urgency, new_view){
            firebaseSetQueryUrgency(new_urgency)
            this.data = await firebaseGetEvents()
            localStorage.setItem("view", new_view)
            this.view = new_view
        }
    },
    data: () => {
        return {
            tab: "All",
            view: "Card",
            data: []
        }
    },
    components: {
        filter_tasks,
        cardView,
        tableView
    }
}
</script>

<style scoped>
.nav-link{
    color: var(--text-colour-alt) !important;
}

.nav-link.active{
    background-color: #00000020 !important;
    border-width: 2px;
    border-color: var(--secondary-colour) !important;
}

#task_container{
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 100%;
}

#task_side_bar{
    height: 100%;
    width: 80px;
    
    background-color: var(--secondary-colour);

    border-left-width: 1px;
    border-left-color: #00000020;
    border-left-style: solid;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-left: auto;
}

@media only screen and (max-width: 600px) {
    #task_div {
        font-size: 4vw;
        width: 90%;
    }

    #task_status {
        font-size: 4vw;
    }

}
</style>
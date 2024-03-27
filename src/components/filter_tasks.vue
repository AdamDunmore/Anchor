<template>
    <!--Filter Button-->
    <button id="filter_button" @click="open_modal"><img id="filter_icon" src="../assets/img/filter.svg" /></button>
    <!--Filter Menu-->
    
    <div id="filter_menu"></div>
        <div class="modal" id="filter_modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title"></div>
                    </div>
                    <div class="modal-body">
                        <h5 class="modal_title">Urgency</h5>
                        <div class="btn-group" role="group">
                            <button type="button" :class="{urgency_active : urgency == 0}" class="btn urgency_button" @click="() => {urgency = 0}">All</button>
                            <button type="button" :class="{urgency_active : urgency == 4}" class="btn urgency_button" @click="() => {urgency = 4}">Urgent</button>
                            <button type="button" :class="{urgency_active : urgency == 3}" class="btn urgency_button" @click="() => {urgency = 3}">High</button>
                            <button type="button" :class="{urgency_active : urgency == 2}" class="btn urgency_button" @click="() => {urgency = 2}">Medium</button>
                            <button type="button" :class="{urgency_active : urgency == 1}" class="btn urgency_button" @click="() => {urgency = 1}">Low</button>
                        </div>
                        <h5 class="modal_title">View</h5>
                        <div class="btn-group" role="group">
                            <button type="button" :class="{view_active : view == 'Card'}" class="btn view_button" @click="() => {view = 'Card'}">Card</button>
                            <button type="button" :class="{view_active : view == 'Table'}" class="btn view_button" @click="() => {view = 'Table'}">Table</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="apply_filter">Apply</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<style scoped>
    #filter_button{
        background-color: #00000000;

        border: none;
        
        margin: 10px;

        aspect-ratio: 1 / 1;
        width: 100%;
    }

    #filter_button:hover{
        border: 2px #00000040 solid;
        border-radius: 25px;
    }

    #filter_icon{
        width: 80%;
        height: 80%;
    }

    .modal_title{
        color: var(--text-colour-alt);
    }

    .urgency_button, .view_button{
        background-color: var(--primary-colour);
        color: var(--text-colour);
    }

    .urgency_button.urgency_active, .view_button.view_active{
        background-color: var(--primary-colour-hover);
    }

</style>

<script>
import { Modal } from "bootstrap";

export default {
    mounted: function(){
        if (localStorage.getItem("view") != null){
            this.view = localStorage.getItem("view")
        }
    },
    methods: {
        open_modal : function(){
            let modal = Modal.getOrCreateInstance('#filter_modal', {})
            modal.show()
        },
        apply_filter : function(){
            this.$emit("apply_filter", this.urgency, this.view)
        }
    },
    data: () => {
        return{
            urgency : 0,
            view: "Card"
        }
    }

}
</script>
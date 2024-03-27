<template>
    <div id="card_container">
        <div class="card" id="task_div" v-for="item in data">
            <div class="card-header" id="task_header">
                <p class="task_info">{{ item.dateCreated }}</p>
                <p class="task_info" id="task_urgency">{{ item.urgency }}</p>
                <select id="status_select" class="form-select form-select-sm" v-model="item.status"
                @change="this.$emit('update', item.id, item.status)">
                <option selected>Not-Started</option>
                <option>In-Progress</option>
                <option>To Discuss</option>
                <option>Stuck</option>
            </select>
            <button  id="close_button" @click="this.$emit('remove', item.id)">X</button>
        </div>
        <div class="card-text m-2" style="color: var(--text-colour);">
            <p>{{ item.description }}</p>
        </div>
        </div>
    </div>
</template>

<style scoped>
    #card_container{
        width: 100%;
        height: 100%;

        overflow-y: scroll
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
    export default {
        props: {
            data : []
        }
    }
</script>
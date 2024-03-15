<template>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <button class="nav-link" :class="{ active: tab == 'All' }"
                @click="() => { tab = 'All', this.$emit('view', 'All') }">All</button>
        </li>
        <li class="nav-item">
            <button class="nav-link" :class="{ active: tab == 'Urgent' }"
                @click="() => { tab = 'Urgent', this.$emit('view', 4) }">Urgent</button>
        </li>
        <li class="nav-item">
            <button class="nav-link" :class="{ active: tab == 'High' }"
                @click="() => { tab = 'High', this.$emit('view', 3) }">High</button>
        </li>
        <li class="nav-item">
            <button class="nav-link" :class="{ active: tab == 'Medium' }"
                @click="() => { tab = 'Medium', this.$emit('view', 2) }">Medium</button>
        </li>
        <li class="nav-item">
            <button class="nav-link" :class="{ active: tab == 'Low' }"
                @click="() => { tab = 'Low', this.$emit('view', 1) }">Low</button>
        </li>
        <li class="nav-item">
            <button class="nav-link" :class="{ active: tab == 'Completed' }"
                @click="() => { tab = 'Completed', this.$emit('view', 'Completed') }">Completed</button>
        </li>
    </ul>
    <h1 style="color: var(--text-colour-alt); margin-left: 20px;" v-if="info.length == 0">There seems to be no results, try
        another filter set or create an event with the button in the bottom right.</h1>
    <div class="card" id="task_div" v-for="item in info">
        <div class="card-header" id="task_header">
            <p class="task_info">{{ item.dateCreated }}</p>
            <p class="task_info" id="task_urgency">{{ item.urgency }}</p>
            <select id="status_select" class="form-select form-select-sm" v-model="item.status"
                @change="this.$emit('updateS', item.id, item.status)">
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
</template>

<script>
export default {
    mounted: function () {
        this.$emit('view', 'All')
    },
    props: {
        info: [],
    },
    data: () => {
        return {
            tab: "All"
        }
    }
}
</script>

<style>
.nav-link{
    color: var(--text-colour-alt) !important;
}

.nav-link.active{
    background-color: #00000020 !important;
    border-width: 2px;
    border-color: var(--secondary-colour) !important;
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
    }

    #task_status {
        font-size: 4vw;
    }

}
</style>
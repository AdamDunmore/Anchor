<template>
    <table>
        <tr>
            <th>Description</th>
            <th>Urgency</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Completed</th>
        </tr>
        <tr v-for="item in data">
            <td>{{ item.description }}</td>
            <td>{{ item.urgency }}</td>
            <td>{{ item.dateCreated }}</td>
            <td style="min-width: 100px; padding: 0px;">
            <select id="tableStatus" v-model="item.status" @change="this.$emit('updateS',item.id, item.status)">
                <option>Not-Started</option>
                <option>In-Progress</option>
                <option>To Discuss</option>
                <option>Stuck</option>
                <option style="display: none;">Completed</option> <!--Add as method to complete-->
            </select>
            </td>
            <td style="text-align: center;">
            <input type="checkbox" :checked='item.completed === true' :value="item.completed" @click="this.$emit('updateC',item.id, !item.completed)">
            </td>
            <td id="removeEventButton"><button @click="this.$emit('remove', item.id)" id="deleteButton">X</button></td>
        </tr>
    </table>

    <div id="mobileDataContainer">
      <div class="mobileDataSection" v-for="item in data">
        <div id="mobileDataSectionTitleBar">
          <p id="mobileUrg">{{ item.urgency }}</p>
          <p id="mobileDate">{{ item.dateCreated }}</p>
          <select id="statusSelect" v-model="item.status" @change="this.$emit('updateS',item.id, item.status)">
            <option>Not-Started</option>
            <option>In-Progress</option>
            <option>To Discuss</option>
            <option>Stuck</option>
            <option style="display: none;">Completed</option> <!--Add as method to complete-->
          </select>
          <div id="dataButton">
            <input class="mobileDataSectionButton" type="checkbox" :checked='item.completed === true' :value="item.completed" @click="this.$emit('updateC',item.id, !item.completed)">
            <button class="mobileDataSectionButton" @click="this.$emit('remove', item.id)" id="deleteButton">X</button>
          </div>
        </div>
        <p id="mobileDesc">{{ item.description }}</p>
      </div>
    </div>
</template>

<style>
   table{
    background-color: var(--primary-colour);

    padding: 3px;

    border-radius: 6px;

    width: 100%;
  }

  th{
    background-color: var(--quaternary-colour);

    border-radius: 10px;
    border-style: solid;
    border-width: 2px;
    border-color: var(--border-colour);

    padding: 5px;
  }

  td{
    background-color: var(--primary-colour);
    color: var(--text-colour);

    padding: 5px;

    border-radius: 10px;
    border-width: 2px;
    border-style: solid;
    border-color: var(--border-colour);

    word-wrap: break-word;
    max-width: 1000px;
  }

  #deleteButton{
    color: var(--text-colour);
    background-color: var(--primary-colour);
    border-width: 0px;

    transition: background-color 1s;
  }

  #removeEventButton{
    width: 10px;

    transition: background-color 1s;
  }

  #removeEventButton:hover, #removeEventButton:hover #deleteButton{
    background-color: var(--primary-colour-hover);
  }

#tableStatus{
  width: 100%;
  height: 100%;
  min-height: 30px;

  background-color: var(--primary-colour);
  color: #ffffff;

  border-radius: 10px;
  border-width: 0px;
}

#mobileDesc{
  margin-left: 5px;
}

@media only screen and (max-width: 600px) { /*Mobile Only*/
    table{
      display: none;
    }

    #mobileDataContainer{
      padding: 5px;

      height: calc(100% - 10px);

      overflow-y: scroll;
    }

    .mobileDataSection{
      width: 100%;
      height: auto;

      border-radius:8px;

      margin-bottom: 10px;

      padding: 0px;

      background-color: var(--primary-colour);

      display: flex;
      flex-direction: column;
    }

    #mobileDataSectionTitleBar{
      height: 30px;
      width: 100%;

      background-color: var(--primary-colour-hover);

      display: flex;
      flex-direction: row;
      align-items: center;

      position: relative;
    }

    #statusSelect{
      margin-left: 10px;

      width: 90px;

      border: none;

      background-color: var(--primary-colour-hover);

      color: var(--text-colour);
    }

    #mobileUrg{
      margin-left: 10px;
      margin-right: 10px
    }

    #dataButton{
      margin-left: auto;
    }

    #deleteButton{
      background-color: var(--primary-colour-hover);
    }
  }

  @media only screen and (min-width: 600px) { /*PC only*/
    #mobileDataContainer{
      display: none;
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
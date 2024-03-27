<template>
  <div id="table_container">
    <table>
      <tr>
        <th class="table_item table_header">Description</th>
        <th class="table_item table_header">Urgency</th>
        <th class="table_item table_header">Date Created</th>
        <th class="table_item table_header">Status</th>
        <th class="table_item table_header"></th>
      </tr>
      <tr v-for="item in data">
        <td class="table_item table_data">{{ item.description }}</td>
        <td class="table_item table_data">{{ item.urgency }}</td>
        <td class="table_item table_data">{{ item.dateCreated }}</td>
        <td class="table_item table_data" style="min-width: 100px; padding: 0px;">
          <select id="tableStatus" v-model="item.status" @change="this.$emit('update',item.id, item.status)">
            <option>Not-Started</option>
            <option>In-Progress</option>
            <option>To Discuss</option>
            <option>Stuck</option>
          </select>
        </td>
        <td class="table_item table_data" style="width: 1px; padding: 0px;"><button @click="this.$emit('remove', item.id)" id="deleteButton">X</button></td>
      </tr>
    </table>
  </div>

    <!-- <div id="mobileDataContainer">
      <div class="mobileDataSection" v-for="item in data">
        <div id="mobileDataSectionTitleBar">
          <p id="mobileUrg">{{ item.urgency }}</p>
          <p id="mobileDate">{{ item.dateCreated }}</p>
          <select id="statusSelect" v-model="item.status" @change="this.$emit('updateS',item.id, item.status)">
            <option>Not-Started</option>
            <option>In-Progress</option>
            <option>To Discuss</option>
            <option>Stuck</option>
          </select>
          <div id="dataButton">
            <button class="mobileDataSectionButton" @click="this.$emit('remove', item.id)" id="deleteButton">X</button>
          </div>
        </div>
        <p id="mobileDesc">{{ item.description }}</p>
      </div>
    </div> -->
</template>

<style scoped>
  #table_container{
    width: 100%;

    margin: 10px;

    overflow: hidden;
  }

  table{
    background-color: var(--primary-colour);
    width: 100%;
    height: auto;
  }

  .table_header{
    background-color: var(--quaternary-colour);

    height: 40px;
  }

  tr{
    height: 40px;
  }

  .table_item{
    padding: 5px;
    height: 40px;
  }

  .table_data{
    background-color: var(--primary-colour);
    color: var(--text-colour);

    border-width: 2px;
    border-style: solid;
    border-color: var(--border-colour);

    word-wrap: break-word;
  }

  #deleteButton{
    color: var(--text-colour);
    background-color: var(--primary-colour);
    
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;

    width: 40px;
    height: 40px;
  }

  #tableStatus{
    width: 100%;
    height: 100%;
    min-height: 30px;

    background-color: var(--primary-colour);
    color: #ffffff;

    border: none;

    transition: background-color 0.2s;
  }

  #deleteButton:hover, #tableStatus:hover{
    background-color: var(--primary-colour-hover);
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
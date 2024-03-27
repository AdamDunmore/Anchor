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

@media only screen and (max-width: 600px) { /*Mobile Only*/
    table{
      width: 100%;

      font-size: .7rem;
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
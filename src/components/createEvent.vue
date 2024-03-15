<template>
    <div id="eventMake">
      <h2 id="EventMake">Create Event</h2>
      <textarea id="entryDescription" v-model="description" type="text" maxlength="255" placeholder="Description"></textarea> <!--description-->
      
      <div id="urgencyDiv">
        <h3 id="textUrgency">Urgency</h3>
        <select v-model="urgency" id="entryUrgency">
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
          <option value="4">Urgent</option>
        </select> <!--Urgent 1-4-->
      </div>
      <button id="submitButton" @click="() => {method(); changeMakeEvent();}">Submit</button> <!--Send request-->
      <button id="closeButton" @click="method">Close</button>
    </div>
</template>

<style>
   #eventMake{
    position: absolute;
    right: 15px;
    bottom: 15px;

    padding: 10px;

    
    border-radius: 15px;
    
    overflow: hidden;
    
    transition: width 0.5s, height 0.5s, background-color 0.5s;
  }
  
  .makeEventOn{
    width: 400px;
    height: 240px;
    background-color: var(--primary-colour);
  }

  .makeEventOff{
    width: 0px;
    height: 0px;
    background-color: #ffffff00;
  }

  #entryDescription{
    position: relative;
    left: 5px;

    width: 360px;
    height: 110px;

    padding: 10px;

    resize: none;
  }

  #urgencyDiv{
      display: flex;
      flex-direction: row;
      align-items: center;

      width: 100%;

      position: absolute;
      bottom: 15px;
    }
  
  #textUrgency{
    margin-left: 9px;
    margin-right: 9px;
    font-size: 24px;
  }

  #entryUrgency{
    width: 100px;
    
    font-size: large;
    
    padding: 10px;

    border-radius: 45px;
    border: none;
  }

  #closeButton{
    position: absolute;
    right: 15px;
    bottom: 15px;

    border-radius: 45px;
    border-width: 0px;
    
    padding: 10px;

    color: var(--text-colour);
    background-color: var(--tertiary-colour);

    font-size: large;
  }

  #submitButton{
    position: absolute;
    right: 85px;
    bottom: 15px;

    border-radius: 45px;
    border-width: 0px;
    
    padding: 10px;

    color: var(--text-colour-alt);
    background-color: var(--secondary-colour);

    font-size: large;
  }

  @media only screen and (max-width: 600px) {
    #eventMake{
      margin-left: 10px;
      margin-right: 10px;
    }
    
    .makeEventOn{
      width: calc(100% - 60px);
      height: 300px;
    }

    #entryDescription{
      width: calc(100% - 40px);
    }

    #urgencyDiv{
      display: flex;
      flex-direction: row;
      align-items: center;

      width: 100%;

      position: relative;
      top: 10px;
    }

    #entryUrgency{
      position: relative;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;

      height: 40px;
      width: 110px;

      margin-left: 10px;
    }
  }

  #EventMake{
    text-align: center;

    width: 100%;
  }

  #submitButton{
    float: left;
  }
</style>

<script>
    export default{
        props: {
            method : null
        },
        methods: {
            changeMakeEvent : function(){
                this.$emit("newEvent", this.description, this.urgency)
                this.description = ""
                this.urgency = 1
            }
        },

        data :() => {
            return{
                description : "",
                urgency : 1,
            }
        }
    }
</script>
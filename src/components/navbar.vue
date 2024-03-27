<template>
    <nav class="nav justify-content-start align-items-center p-2" style="background-color: var(--primary-colour);">
      <div id="logo_container"><img id="sidebar_logo" src="../assets/img/logo_with_text_white.png"></div>
      <select class="mobile" v-model="tab" id="tab">
        <option value="Main">Main</option>
        <option value="All">All</option>
        <option value=4>Urgent</option>
        <option value=3>High</option>
        <option value=2>Medium</option>
        <option value=1>Low</option>
        <option value="Completed">Completed</option>
      </select> <!--Urgent 1-4-->
 
      <div class="btn-group" role="group">
        <button type="button" :class="{active : tab == 'Home'}" class="btn sidebarButton" id="home" @click="() => {this.$emit('changeTab', 'Home'), tab='Home'}"></button>
        <button type="button" :class="{active : tab == 'Tasks'}" class="btn sidebarButton" id="documents" @click="() => {this.$emit('changeTab', 'Tasks'), tab='Tasks'}"></button>
      </div>

      <button class="sidebarButton btn" id="teams" @click="() => {togglePopup('teams')}"></button>
      <button class="sidebarButton btn" id="settings" @click="() => {togglePopup('settings')}"></button>
    </nav>
    <teams :class="{teams_on : popUp == 'teams', teams_off : popUp != 'teams'}"/>
    <settings :class="{settings_on : popUp == 'settings', settings_off : popUp != 'settings'}"/>
</template>

<script>
  import settings from './settings.vue';
  import teams from './teams.vue';
  export default {
    methods : {
      togglePopup : function(popUp){
        if (this.popUp == popUp){
          this.popUp = "none"
        }
        else{
          this.popUp = popUp
        }
      }
    },

    data : () => {
      return{
        tab : "Home",
        popUp : "none"
      }
    },
    components: {
      settings,
      teams,
    }
  }
</script>

<style>
 @media only screen and (min-width: 600px) { /* PC Only */
  #sidebar_logo{
    width: auto;
    height: 60px;

    display: block;

    margin-right: 20px;

    float: right;
  }

  .sidebarButton{
    width: 60px;
    height: 60px;

    border: none;

    margin: 0px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 40px;

    background-color: var(--primary-colour);
  }

  .sidebarButton:hover{
      background-color: var(--primary-colour-hover);
  }
  
  .sidebarButton.active{
    background-color: var(--primary-colour-hover);
  }

  #home{
    background-image: url("../assets/img/home.png");
  }

  #documents{
    background-image: url("../assets/img/document.svg");
  }

  #settings{
    background-image: url("../assets/img/settings.svg");
    transition: rotate 0.5s;
  }

  #teams{
    margin-left: auto;

    background-image: url("../assets/img/account.svg");
  }

  .mobile{
    display: none;
  }
 }


  @media only screen and (max-width: 600px) { /*Mobile Only*/
      #sidebar{
        width: 100%;
        height: 60px;

        background-color: var(--primary-colour);

        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .iconButtonText, .sidebarButton{
        display: none;
      }

      #sidebar_logo{
        margin-left: 10px;

        width: 120px;
      }

      #tab{
        margin-left: auto;
        margin-right: 10px;

        padding: 2px;

        border-radius: 10px;
        border-width: 2px;
        border-style: solid;
        border-color: var(--secondary-colour);

        color: var(--text-colour);
        background-color: var(--primary-colour);
      }

      #tab:focus{
        outline: none;
      }

      #settings{
        height: 60%;
        width: auto;
        aspect-ratio: 1/1; 

        background-image: url("../assets/img/setting.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-color: #ffffff00;
        
        margin-right: 4px;

        border: none;
      }

      #teams{
        height: 60%;
        width: auto;
        aspect-ratio: 1/1; 

        background-image: url("../assets/img/account.png");
        background-repeat: no-repeat;
        background-position: center;
        background-color: #ffffff00;
        
        margin-right: 4px;

        border: none;
      }
   }
</style>
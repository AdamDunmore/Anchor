<template>
    <button id="createEventButton" @click="this.$emit('toggleMakeEvent')"><p id="createEvent_Text">+</p></button>
</template>

<style>
   #createEventButton{
    width: 40px;
    height: 40px;

    border-radius: 90px;
    border-width: 0px;

    padding: 0px;

    position: absolute;
    right: 30px;
    bottom: 30px;


    background-color: var(--tertiary-colour);

    color: var(--text-colour);
    font-size: 35px;

    transition: background-color 0.5s;
  }

  #createEventButton:hover{
    background-color: var(--tertiary-colour-hover);
  }

  #createEvent_Text{
    display: flex;
    justify-content: center;
    align-items: center;

    transform: translateY(-2px);

    margin: 0px; height: 100%; width:100%;
  }
</style>


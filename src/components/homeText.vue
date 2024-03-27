<template>
    <div class="board" id = "MainBoard">
        <h1 class="MainText">Welcome to Anchor</h1>
        <h2 class="MainText">Anchor is a webapp for organizing all of your tasks.</h2>
        <h3 class="MainText">To add a task just click the add button in the bottom right</h3>
    </div>
</template>

<style>
    .MainText{
        margin-left: 20px;
        color: var(--text-colour-alt);
    }

    @media only screen and (max-width: 600px) {
        #MainBoard{
            display: block;
        }

        .MainText{
            margin-top: 10px;
        }
    }
</style>
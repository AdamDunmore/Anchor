<template>
    <div id="teams_div">
        <h2>Teams</h2>
        <h3>Coming Soon</h3>
    </div>
</template>

<style>
    #teams_div{
        background-color: var(--primary-colour);

        position: absolute;
        bottom: 0px;
        left: 200px;

        width: 400px;

        display: flex;
        align-items: center;
        flex-direction: column;

        overflow: hidden;

        transition: height 0.3s;

        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
    }

    .teams_on{
        height: 200px;
    }

    .teams_off{
        height: 0px;
    }

    @media only screen and (max-width: 600px) {
        #teams_div{
            left: 0px;
            width: 100%;
        }
    }
</style>
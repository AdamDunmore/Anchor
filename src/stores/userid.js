import {createStore} from 'vuex'

const userIDStore = createStore({
    state () {
      return {
        userID: ""
      };
    },
    mutations: {
      changeUserID (state, input) {
        state.userID = input
      }
    }
  });

export default userIDStore;
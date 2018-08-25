
import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
          url: ''
        },
        getters: {
          getUrl: state => state.url
        },
        mutations: {
          saveUrl (state, url) {
            state.url = url
          }
        },
        actions: {
      
        }
    })
}
export default createStore

//import { resolve, reject } from "core-js/fn/promise"

const state = {
    data: localStorage.getItem('access_data') || null,
    token: localStorage.getItem('access_token') || null,
    status: 0
}

const getters = {
    // user: state => state.user,
    //isLogged: state => (state.token !== null)
    isLogged: (state) => {
        return (state.token !== null)
    },
    dataLogged: (state) => {
        return state.data
    },
    isAdmin: (state) => {
        try {

            let objectData = state.data
            if ((typeof state.data) !== "object") {
                objectData = JSON.parse(state.data ? state.data : null)
                return 3 === objectData.status && (state.token !== null)
            } else {
                return false;
            }


        } catch (e) {
            console.log(e)
            return false;
        }

    },
    isWebAdmin: (state) => {
        try {
            let objectData = state.data
            if ((typeof state.data) !== "object") {
                objectData = JSON.parse(state.data ? state.data : null)
                return 2 === objectData.status && (state.token !== null)
            } else {
                return false;
            }

        } catch (e) {
            console.log(e)
            return false;
        }

    },
    isUser: (state) => {
        try {
            let objectData = state.data
            if ((typeof state.data) !== "object") {
                objectData = JSON.parse(state.data ? state.data : null)
                return 1 === objectData.status && (state.token !== null)
            } else {
                return false;
            }

        } catch (e) {
            console.log(e)
            return false;
        }

    }
}

const mutations = {
    //setUser: (state, user) => {        state.user = user    },
    retrieveToken: (state, data) => {
        state.token = data.token
        state.data = data.data
    },
    destroyToken: (state) => {
        state.token = null
        state.data = null
    },
    userStatus: (state, data) => {
        state.status = data
    }
}

const actions = {
    destroyToken: function(context) {
        this._vm.$http.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        if (context.getters.isLogged) {

            localStorage.removeItem('access_token')
            localStorage.removeItem('access_data')

            context.commit('destroyToken')

        }
    },
    retrieveToken: async function(context, credentials) {
        await this._vm.$http.post('/api/login', credentials)
            .then(response => {
                console.log(response)
                const token = response.data.token
                if (response.data.success) {
                    localStorage.setItem('access_token', token)
                    localStorage.setItem('access_data', JSON.stringify(response.data.data))
                    context.commit('retrieveToken', response.data)
                } else {
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('access_data')
                    context.commit('destroyToken')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
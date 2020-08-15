import Vue from 'vue';
import Vuex from 'vuex';

import user from './user'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        jobs: {
            ptype: [
                { id: 1, topic: "ชั่วคราว", class: 'part-time' }, { id: 2, topic: "ประจำ (รายวัน)", class: 'full-time' }, { id: 3, topic: "ประจำ (รายเดือน)", class: 'full-time' }
            ],
            stype: [
                { id: 1, topic: "งานด่วน" }, { id: 2, topic: "ปกติ" }
            ]
        }
    },
    getters: {
        getptype: (state) => (id) => {
            return state.jobs.ptype.find(x => x.id === id)
        },
        strtojson: () => (value, key = 'topic') => {
            let x = {}
            if (value !== undefined) x = JSON.parse(value)
            return x[key]
        }
    },
    mutations: {},
    actions: {},
    modules: {
        user
    },
});
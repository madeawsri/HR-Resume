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
            ],
            etype: [
                { id: 1, topic: "ประถมศึกษา" },
                { id: 2, topic: "มัธยมศึกษา" },
                { id: 3, topic: "อชีวศึกษา" },
                { id: 4, topic: "ปริญญาตรี" },
                { id: 5, topic: "ปริญญาโท" },
            ],
            ctype: [
                { id: 0, topic: "ไม่มี" },
                { id: 1, topic: "รถชนิดชั่วคราว" },
                { id: 2, topic: "รถยนต์ส่วนบุคคล" },
                { id: 3, topic: "รถยนต์สามล้อส่วนบุคคล" },
                { id: 4, topic: "รถยนต์สาธารณะ" },
                { id: 5, topic: "รถยนต์สามล้อสาธารณะ" },
                { id: 6, topic: "รถจักรยานยนต์ส่วนบุคคล" },
                { id: 7, topic: "รถจักรยานยนต์สาธารณะ" },
                { id: 8, topic: "ขับรถบดถนน" },
                { id: 9, topic: "รถแทรกเตอร์" },
                { id: 10, topic: "รถชนิดอื่นนอกจาก (1) ถึง (9)" },
                { id: 11, topic: "รถระหว่างประเทศ" },
            ],
            status: [
                { id: 0, topic: "ว่างงาน" },
                { id: 1, topic: "รับเข้าทำงาน" },
                { id: 2, topic: "ถูกออกจากงาน" },
                { id: 3, topic: "ลาออก" },
                { id: 4, topic: "เลิกจ้าง" }
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
        },

    },
    mutations: {},
    actions: {},
    modules: {
        user
    },
});
<template lang="th">
<memberLayout>
    <div slot="content">

        <div class="col-lg-12 col-md-12">

            <div class="dashboard-list-box margin-top-0">
                <h4>{{headTitle}}</h4>

                <div class="dashboard-list-box-content">
                    <form @submit.prevent="sendData">

                        <div class="submit-page">

                            <div class="form">
                                <h5> เลือกตำแหน่งเปิดรับสมัคร </h5>
                                <v-multiselect placeholder=" ตำแหน่งงาน " label="topic" track-by="topic" v-model="dataForm.position" :options="lstPositions" :multiple="false" :close-on-select="true" :hide-selected="true" :show-labels="false" required></v-multiselect>

                            </div>

                            <div class="form">
                                <h5> จำนวนผู้รับเข้าทำงาน </h5>
                                <input type="number" maxlength="2" placeholder="จำนวนผู้รับเข้าทำงาน " v-model="dataForm.num" required />
                            </div>

                            <div class="form">
                                <h5> เลือกคุณลักษณะผู้สมัคร </h5>
                                <v-multiselect placeholder=" คุณลักษณะผู้สมัคร " label="topic" track-by="topic" v-model="dataForm.jobattr" :options="lstJobattrs" :multiple="false" :close-on-select="true" :hide-selected="true" :show-labels="false" />
                            </div>
                            <div class="form">
                                <h5> ระยะเวลาในการประกาศรับสมัคร </h5>
                                <v-date v-model="dataForm.regdate" class="datetime-picker" value-type="format" format="YYYY-MM-DD" :lang="dateFormatThai" type="date" range placeholder="Select date range"></v-date>
                            </div>

                            <button type="submit" class="button margin-bottom-30  float-xl-right "> {{editForm.modeTitle}} <i class="fa fa-arrow-circle-right"></i></button>

                        </div>
                    </form>
                </div>
            </div>

            <div class="dashboard-list-box margin-top-30">
                <div class="dashboard-list-box-content">

                    <!-- Table -->

                    <table class="manage-table responsive-table">

                        <tr>
                            <th width="25%"><i class="fa fa-tasks"></i> ตำแหน่ง / คน</th>
                            <th width="20%"><i class="fa fa-file-text"></i> คุณลักษณะผู้สมัคร</th>
                            <th width="25%"><i class="fa fa-file-text"></i> ระยะเวลารับสมัคร</th>
                            <th width="30%"></th>

                        </tr>

                        <tr style="padding: 5px 5px;" v-for="(item, index) in listDatas" :key="index">
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> <i class="fa fa-check"></i> {{item.topic}} / {{item.num}} คน</td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{ item.jobattrid | stringToJson }}</td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{item.datein | moment("DD MMMM YYYY")}} ถีง {{item.dateout | moment("DD MMMM YYYY")}}</td>
                            <td style="padding: 5px 5px;">
                                <a href="#" @click="preEditData(index,item.id)" class="button" style="margin-right:5px;"><i class="fa fa-pencil"></i> แก้ไข</a>
                                <a href="#" @click="delData(index,item.id)" class="button" style="margin-right:5px;"><i class="fa fa-remove"></i> ลบ </a>
                            </td>
                        </tr>

                    </table>

                </div>
            </div>

        </div>

    </div>
</memberLayout>
</template>

<script>
import "vue-select/src/scss/vue-select.scss";
import memberLayout from '@/components/member-layouts/index'
//import moment from 'moment'

export default {
    components: {
        memberLayout,
        //  moment
    },
    mounted() {

    },
    async created() {
        await this.getLstDatas();
        await this.showDataAll();
    },
    data() {
        return {
            dateFormatThai: {
                'days': ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
                'months': ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
                'pickers': ['7 วันถัดไป', '30 วันถัดไป', '7 ที่ผ่านมา', '30 วันที่ผ่านมา'],
                'placeholder': {
                    'date': 'เลือกวันที่',
                    'dateRange': 'เลือกช่วงวันที่'
                }
            },
            isLoading: false,
            headTitle: 'ประกาศรับสมัครงาน',
            editForm: {
                keydb: 0,
                index: 0,
                mode: "save",
                modeTitle: "บันทึกข้อมูล"
            },
            dataForm: {
                position: [],
                num: 1,
                regdate: ['2020-01-01', '2020-02-02'],
                jobattr: []
            },
            dataFormReset: {
                ...this.dataForm
            },
            lstPositions: [],
            lstJobattrs: [],

            listDatas: [] // data in table

        }
    },
    methods: {

        getLstDatas: async function () {
            try {

                const dataP = await this.$http.get('api/position')
                const dataJ = await this.$http.get('api/jobattr')

                this.$http.all([dataP, dataJ]).then(
                    this.$http.spread((...res) => {
                        this.lstPositions = res[0].data.data
                        this.lstJobattrs = res[1].data.data
                    })
                )

            } catch (e) {
                console.log(e)
            }
        },
        alertSuccess: function (msg = "บันทึกเรียบร้อยแล้ว") {
            this.$fire({
                title: this.headTitle,
                text: msg,
                type: "success",
                timer: 3000
            })
        },
        alertFail: function () {
            this.$fire({
                topic: this.headTitle,
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
        focusInput: function (inputRef) {
            this.$refs[inputRef].focus();
        },
        async sendData() {
            try {

                if (this.editForm.mode == "save") {
                    console.log('----save---')

                    const dataForm2 = {
                        ...this.dataForm
                    }
                    //console.log(dataForm2.position)
                    dataForm2.topic = dataForm2.position.topic
                    dataForm2.position = JSON.stringify(dataForm2.position)
                    dataForm2.jobattr = JSON.stringify({
                        id: this.dataForm.jobattr.id,
                        topic: this.dataForm.jobattr.topic
                    })
                    dataForm2.datein = dataForm2.regdate[0]
                    dataForm2.dateout = dataForm2.regdate[1]

                    const {
                        data
                    } = await this.$http.post(`api/jobs`, dataForm2)

                    console.log(data)

                    if (data.success == 1) {
                        this.listDatas.push({
                            id: data.data.insertId,
                            topic: dataForm2.topic,

                        })
                        this.dataForm = {
                            ...this.dataFormReset
                        }
                        //  this.focusInput('topic')
                        this.alertSuccess()
                    } else {
                        this.alertFail()
                    }

                } else {

                    const dataForm2 = {
                        ...this.dataForm
                    }
                    dataForm2.position = JSON.stringify(dataForm2.position)
                    dataForm2.jobattr = JSON.stringify({
                        id: this.dataForm.jobattr.id,
                        topic: this.dataForm.jobattr.topic
                    })
                    dataForm2.datein = dataForm2.regdate[0]
                    dataForm2.dateout = dataForm2.regdate[1]

                    const {
                        data
                    } = await this.$http.post(`api/jobs/${this.editForm.keydb}`, dataForm2)

                    if (data.success == 1) {

                        this.listDatas[this.editForm.index].topic = this.dataForm.topic
                        this.listDatas[this.editForm.index].jobattrid = JSON.stringify({
                            id: this.dataForm.jobattr.id,
                            topic: this.dataForm.jobattr.topic
                        })
                        this.listDatas[this.editForm.index].datein = dataForm2.datein
                        this.listDatas[this.editForm.index].dateout = dataForm2.dateout
                        this.listDatas[this.editForm.index].num = dataForm2.num

                        this.alertSuccess('แก้ไขข้อมูลเรียบร้อย.')
                        this.dataForm = {
                            ...this.dataFormReset
                        }
                        this.editForm.mode = "save"
                        this.editForm.modetopic = "บันทึกข้อมูล"

                    } else {

                        this.alertFail()

                    }

                }

            } catch (e) {
                console.log(e)
                this.alertFail()
            }
        },
        async delData(index, keyDB) {

            try {
                const {
                    data
                } = await this.$http.delete(`api/jobs/${keyDB}`)

                if (data.success == 1) {
                    this.listDatas.splice(index, 1);
                    this.alertSuccess('ลบข้อมูลเรียบร้อยแล้ว.')
                } else {
                    this.alertFail()
                }

            } catch (e) {
                console.log(e)

            }
        },
        async preEditData(index, keyDB) {

            this.editForm.keydb = keyDB
            this.editForm.index = index
            this.editForm.mode = "edit"
            this.editForm.modeTitle = "แก้ไขข้อมูล"

            try {
                const {
                    data
                } = await this.$http.get(`api/jobs/${keyDB}`)

                if (data.success == 1) {

                    this.dataForm = {
                        position: JSON.parse(data.data.positionid),
                        jobattr: JSON.parse(data.data.jobattrid),
                        num: data.data.num,
                        regdate: [data.data.datein, data.data.dateout]
                    }

                } else {
                    this.alertFail()
                }

            } catch (e) {
                console.log(e)
                this.alertFail()

            }

            console.log(this.editForm)

            this.dataForm.topic = this.listDatas[index].topic
        },
        async showDataAll() {
            try {
                const {
                    data
                } = await this.$http.get(`api/jobs`)

                if (data.success == 1) {

                    this.listDatas = data.data

                    console.log(this.listDatas)

                } else {
                    this.alertFail()
                }

            } catch (e) {
                console.log(e)

            }

        },
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style src="vue2-datepicker/index.css"></style><style>
.multiselect__single {
    height: 30px;
}

.vs--searchable .vs__dropdown-toggle {
    cursor: text;
    height: 48px;
}

.vs__dropdown-option--highlight {
    background: #5897fb;
    color: blue;
}

.multiselect__option {

    padding: 0px;
    min-height: 0px;
    line-height: 0px;

}

.multiselect__option--highlight {
    background: #41b883;
    outline: none;
    color: mediumblue;
}

.multiselect__option--selected.multiselect__option--highlight {
    background: #ff6a6a;
    color: slategrey;
}

.mx-input {
    height: 48px;
}
</style>

<template>
<memberLayout>
    <div slot="content">

        <div class="col-lg-12 col-md-12">

            <div class="dashboard-list-box margin-top-0">
                <h4>{{headTitle}}</h4>

                <div class="dashboard-list-box-content">
                    <form @submit.prevent="sendData">

                        <div class="submit-page">

                            <div class="form">
                                <h5> ตั้งชื่อคุณลักษณะผู้สมัคร </h5>
                                <input type="text" ref="topic" placeholder="ตั้งชื่อคุณลักษณะผู้สมัคร " v-model="dataForm.topic" v-focus required />
                            </div>

                            <div class="form">
                                <h5> เลือกคุณสมบัติผู้สมัคร </h5>
                                <v-multiselect placeholder="กรุณาเลือกได้มากกว่า 1 " label="topic" track-by="topic" v-model="dataForm.benefits" :options="lstBenefits" :multiple="true" :close-on-select="false" :hide-selected="true" :show-labels="false"></v-multiselect>

                            </div>
                            <div class="form">
                                <h5> เลือกหลักฐานผู้สมัคร </h5>
                                <v-multiselect placeholder="กรุณาเลือกได้มากกว่า 1 " label="topic" track-by="topic" v-model="dataForm.qualifys" :options="lstQualifys" :multiple="true" :close-on-select="false" :hide-selected="true" :show-labels="false" />
                            </div>
                            <div class="form">
                                <h5> เลือกสวัสดิการและผลประโยชน์ </h5>
                                <v-multiselect placeholder="กรุณาเลือกได้มากกว่า 1 " track-by="topic" label="topic" v-model="dataForm.proofs" :options="lstProofs" :multiple="true" :close-on-select="false" :hide-selected="true" :show-labels="false" />
                            </div>

                            <button type="submit" class="button margin-bottom-30 float-xl-right "> {{editForm.modeTitle}} <i class="fa fa-arrow-circle-right"></i></button>

                        </div>
                    </form>
                </div>
            </div>

            <div class="dashboard-list-box margin-top-30">
                <div class="dashboard-list-box-content">

                    <!-- Table -->

                    <table class="manage-table responsive-table">

                        <tr>
                            <th width="80%"><i class="fa fa-file-text"></i> รายงาน{{headTitle}}</th>
                            <th width="20%"></th>
                        </tr>

                        <tr style="padding: 5px 5px;" v-for="(item, index) in listDatas" :key="index">
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> <i class="fa fa-check"></i> {{item.topic}}</td>
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

export default {
    components: {
        memberLayout
    },mounted() {
        if(!this.$store.getters['user/isWebAdmin']) {
          this.alertAccess();
        }
    },
    async created() {
        await this.getLstDatas();
        await this.showDataAll();
    },
    data() {
        return {

            isLoading: false,
            headTitle: 'คุณลักษณะผู้สมัคร',
            editForm: {
                keydb: 0,
                index: 0,
                mode: "save",
                modeTitle: "บันทึกข้อมูล"
            },
            dataForm: {
                topic: '',
                qualifys: [],
                benefits: [],
                proofs: []

            },
            dataFormReset: {
                ...this.dataForm
            },
            lstBenefits: [],
            lstQualifys: [],
            lstProofs: [],

            listDatas: [{
                id: 1,
                topic: 'xxx'
            }] // data in table

        }
    },
    methods: {
        alertAccess: function () {
            this.$fire({
                title: this.headTitle,
                text: "ไม่อนุญาติ",
                type: "warning",
                timer: 3000
            }).then(() => {
                this.$router.push('/home')
            })
        },
        getLstDatas: async function () {
            try {

                const dataQ = await this.$http.get('api/qualify')
                const dataB = await this.$http.get('api/benefits')
                const dataP = await this.$http.get('api/Proof')

                this.$http.all([dataQ, dataB, dataP]).then(
                    this.$http.spread((...res) => {
                        this.lstQualifys = res[0].data.data
                        this.lstBenefits = res[1].data.data
                        this.lstProofs = res[2].data.data
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
                    dataForm2.qualifys = JSON.stringify(dataForm2.qualifys)
                    dataForm2.proofs = JSON.stringify(dataForm2.proofs)
                    dataForm2.benefits = JSON.stringify(dataForm2.benefits)

                    const {
                        data
                    } = await this.$http.post(`api/jobattr`, dataForm2)

                    console.log(data)

                    if (data.success == 1) {
                        this.listDatas.push({
                            id: data.data.insertId,
                            topic: this.dataForm.topic
                        })
                        this.dataForm = {
                            ...this.dataFormReset
                        }
                        this.focusInput('topic')
                        this.alertSuccess()
                    } else {
                        this.alertFail()
                    }

                } else {

                    const dataForm2 = {
                        ...this.dataForm
                    }
                    dataForm2.qualifys = JSON.stringify(dataForm2.qualifys)
                    dataForm2.proofs = JSON.stringify(dataForm2.proofs)
                    dataForm2.benefits = JSON.stringify(dataForm2.benefits)

                    const {
                        data
                    } = await this.$http.post(`api/jobattr/${this.editForm.keydb}`, dataForm2)

                    if (data.success == 1) {
                        this.listDatas[this.editForm.index].topic = this.dataForm.topic
                        this.focusInput('topic')
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
                } = await this.$http.delete(`api/jobattr/${keyDB}`)

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
                } = await this.$http.get(`api/jobattr/${keyDB}`)

                if (data.success == 1) {

                    data.data.benefits = JSON.parse(data.data.benefits)
                    data.data.qualifys = JSON.parse(data.data.qualifys)
                    data.data.proofs = JSON.parse(data.data.proofs)

                    this.dataForm = data.data

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
                } = await this.$http.get(`api/jobattr`)

                if (data.success == 1) {

                    this.listDatas = data.data

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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style><style>
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
</style>

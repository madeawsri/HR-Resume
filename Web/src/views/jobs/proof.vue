<template>
<memberLayout>
    <div slot="content">

        <div class="col-lg-12 col-md-12">

            <div class="dashboard-list-box margin-top-0">
                <h4>{{headtopic}}</h4>
                <div class="dashboard-list-box-content">
                    <form id="frmData" @submit.prevent="sendData">
                        <div class="submit-page">
                            <!-- topic -->
                            <div class="form">
                                <h5>จัดการรายการ{{headtopic}}</h5>
                                <input class="search-field" ref="topic" name="topic" type="text" placeholder="" v-model="dataForm.topic" v-focus required />
                            </div>
                            <div class="form">
                                <h5>&nbsp;</h5>
                                <button type="submit" class="button margin-top-30"> {{editForm.modetopic}} <i class="fa fa-arrow-circle-right"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="dashboard-list-box margin-top-30">
                <div class="dashboard-list-box-content">

                    <!-- Table -->

                    <table class="manage-table responsive-table">

                        <tr>
                            <th width="80%"><i class="fa fa-file-text"></i> รายงาน{{headtopic}}</th>
                            <th width="20%"></th>
                        </tr>

                        <tr style="padding: 5px 5px;" v-for="(item, index) in listDatas" :key="index">
                            <td style="padding: 5px 5px;font-weight:bold;" class="topic"> <i class="fa fa-check"></i> {{item.topic}}</td>
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
import memberLayout from '@/components/member-layouts/index'

export default {
    components: {
        memberLayout
    },
    created() {
this.showDataAll();
    },
    data() {
        return {
            headtopic: 'หลักฐานการสมัคร',
            editForm: {
                keydb: 0,
                index: 0,
                mode: "save",
                modetopic: "บันทึกข้อมูล"
            },
            dataForm: {
                topic: ""
            },
            listDatas: [{
                id: 1,
                topic: 'อายุ 18 ปี บริบูรณ์ '
            }, {
                id: 2,
                topic: 'มีความอดทน ขยัน รับผิดชอบสูง'
            }, {
                id: 3,
                topic: 'สุขภาพสมบูรณ์แข็งแรง'
            }]
        }
    },
    methods: {
        alertSuccess: function (msg = "บันทึกเรียบร้อยแล้ว") {
            this.$fire({
                topic: this.headtopic,
                text: msg,
                type: "success",
                timer: 3000
            })
        },
        alertFail: function () {
            this.$fire({
                topic: this.headtopic,
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
                const objFrm = document.getElementById('frmData')
                const formData = new FormData(objFrm);

                if (this.editForm.mode == "save") {
                    console.log('----save---')

                    const {
                        data
                    } = await this.$http.post(`api/proof`, formData)

                    console.log(data)

                    if (data.success == 1) {
                        this.listDatas.push({
                            id: data.data.insertId,
                            topic: this.dataForm.topic
                        })
                        this.dataForm.topic = ''
                        this.focusInput('topic')
                        this.alertSuccess()
                    } else {
                        this.alertFail()
                    }

                } else {

                    console.log(this.editForm)
                    const {
                        data
                    } = await this.$http.post(`api/proof/${this.editForm.keydb}`, formData)

                    if (data.success == 1) {
                        this.listDatas[this.editForm.index].topic = this.dataForm.topic
                        this.focusInput('topic')
                        this.alertSuccess('แก้ไขข้อมูลเรียบร้อย.')
                        this.dataForm.topic = ''
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
                } = await this.$http.delete(`api/proof/${keyDB}`)

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
        async showDataAll(){
try {
                const {
                    data
                } = await this.$http.get(`api/proof`)

                if (data.success == 1) {
                    
                    this.listDatas = data.data
                    
                } else {
                    this.alertFail()
                }

            } catch (e) {
                console.log(e)

            }

        },
        preEditData(index, keyDB) {

            this.editForm.keydb = keyDB
            this.editForm.index = index
            this.editForm.mode = "edit"
            this.editForm.modetopic = "แก้ไขข้อมูล"

            console.log(this.editForm)

            this.dataForm.topic = this.listDatas[index].topic
        }
    }
}
</script>

<style scoped>

</style>

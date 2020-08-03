<template>
<memberLayout>
    <div slot="content">

        <div class="col-lg-12 col-md-12">

            <div class="dashboard-list-box margin-top-0">
                <h4>{{headTitle}}</h4>
                <div class="dashboard-list-box-content">
                    <form @submit.prevent="sendData">
                        <div class="submit-page">
                            <!-- Title -->
                            <div class="form">
                                <h5>จัดการรายการ{{headTitle}}</h5>
                                <input class="search-field" ref="title" type="text" placeholder="" v-model="dataForm.title" v-focus required />
                            </div>
                            <div class="form">
                                <h5>&nbsp;</h5>
                                <button type="submit" class="button margin-top-30"> {{editForm.modeTitle}} <i class="fa fa-arrow-circle-right"></i></button>
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
                            <th width="80%"><i class="fa fa-file-text"></i> รายงาน{{headTitle}}</th>
                            <th width="20%"></th>
                        </tr>

                        <tr style="padding: 5px 5px;" v-for="(item, index) in listDatas" :key="index">
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> <i class="fa fa-check"></i> {{item.title}}</td>
                            <td style="padding: 5px 5px;">
                                <a href="#" @click="preEditData(index,item.id)" class="button" style="margin-right:5px;"><i class="fa fa-pencil"></i> แก้ไข</a>
                                <a href="#" @click="delData(index)" class="button" style="margin-right:5px;"><i class="fa fa-remove"></i> ลบ </a>
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
        //console.log(this.$refs['headTitle'])
    },
    data() {
        return {
            headTitle: 'สวัสดิการและสิทธิประโยชน์',
            editForm: {
                keydb: 0,
                index: 0,
                mode: "save",
                modeTitle:"บันทึกข้อมูล"
            },
            dataForm: {
                title: ''
            },
            listDatas: [{
                id: 1,
                title: 'อายุ 18 ปี บริบูรณ์ '
            }, {
                id: 2,
                title: 'มีความอดทน ขยัน รับผิดชอบสูง'
            }, {
                id: 3,
                title: 'สุขภาพสมบูรณ์แข็งแรง'
            }]
        }
    },
    methods: {
        alertSuccess: function (msg="บันทึกเรียบร้อยแล้ว") {
            this.$fire({
                title: this.headTitle,
                text: msg,
                type: "success",
                timer: 3000
            })
        },
        alertLoginFail: function () {
            this.$fire({
                title: this.headTitle,
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
        focusInput: function (inputRef) {
            this.$refs[inputRef].focus();
        },
        sendData() {

            if (this.editForm.mode == "save") {
                this.listDatas.push({
                    id: '',
                    title: this.dataForm.title
                })
                this.dataForm.title = ''
                this.focusInput('title')
                this.alertSuccess()
            } else {
                console.log(this.editForm)
                this.listDatas[this.editForm.index].title = this.dataForm.title
                this.focusInput('title')
                this.dataForm.title = ''
                this.alertSuccess('แก้ไขข้อมูลเรียบร้อย.')
                this.editForm.mode="save"
                this.editForm.modeTitle="บันทึกข้อมูล"

            }
        },
        delData(index) {
            this.listDatas.splice(index, 1);
        },
        preEditData(index, keyDB) {

            this.editForm.keydb = keyDB
            this.editForm.index = index
            this.editForm.mode = "edit"
            this.editForm.modeTitle = "แก้ไขข้อมูล"

            console.log(this.editForm)

            this.dataForm.title = this.listDatas[index].title
        }
    }
}
</script>

<style scoped>

</style>

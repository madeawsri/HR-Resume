<template>
<div>

    <memberLayout>
        <div slot="content">
            <!-- Titlebar -->
            <form id="frmData" ref="frmdata" @submit.prevent="saveData">
                <div class="row">
                    <p style="margin-left:15px">
                        <button type="submit" class="button margin-top-0"> <i class="fa fa-save"></i> บันทึกข้อมูล</button>
                    </p>
                    <div class="col-lg-12 col-md-12">

                        <div class="dashboard-list-box margin-top-0">
                            <h4>ข้อมูลความสามารถพิเศษ</h4>
                            <div class="dashboard-list-box-content">

                                <div class="submit-page">

                                    <div class="form3 col-lg-12">
                                        <h5>ความาสามารถด้านการใช้คอมพิวเตอร์ / โปรแกรม</h5>
                                        <input data-role="tagsinput" id="topic" class="search-field" type="text" placeholder="" v-model="dataForm.topic" />
                                    </div>

                                    <div class="form3 col-lg-12 col-xs-12">
                                        <h5>เครื่องที่เคยใช้ในสำนักงาน</h5>
                                        <input class="search-field" type="text" placeholder="" v-model="dataForm.detail" />
                                    </div>

                                    <div class="form3 col-lg-3 col-sm-8 col-xs-12">
                                        <h5>งานด้านช่างฝีมือ</h5>
                                        <select data-placeholder="เลือกงานด้านช่างฝีมือ" v-model="dataForm.workid">
                                            <option value="0">ไม่มี</option>
                                            <option value="1">งานไฟฟ้า</option>
                                            <option value="2">งานเชื่อม</option>
                                            <option value="3">งานเคี่ยวน้ำตาล</option>
                                        </select>
                                    </div>

                                    <div class="form3 col-lg-3 col-sm-4 col-xs-12">
                                        <h5>งานด้านช่างฝีมือ อื่นๆ </h5>
                                        <input class="search-field" type="text" placeholder="" v-model="dataForm.workname" />
                                    </div>

                                    <div class="form3 col-lg-6 col-sm-12 col-xs-12">
                                        <h5>ใบอนุญาตขับขี่</h5>
                                        <select data-placeholder="เลือกใบอนุญาติขับขี่" v-model="dataForm.certcarid">
                                            <option value="0">ไม่มี</option>
                                            <option value="1">รถชนิดชั่วคราว</option>
                                            <option value="2">รถยนต์ส่วนบุคคล</option>
                                            <option value="3">รถยนต์สามล้อส่วนบุคคล</option>
                                            <option value="4">รถยนต์สาธารณะ</option>
                                            <option value="5">รถยนต์สามล้อสาธารณะ</option>
                                            <option value="6">รถจักรยานยนต์ส่วนบุคคล</option>
                                            <option value="7">รถจักรยานยนต์สาธารณะ</option>
                                            <option value="8">ขับรถบดถนน</option>
                                            <option value="9">รถแทรกเตอร์</option>
                                            <option value="10">รถชนิดอื่นนอกจาก (1) ถึง (9)</option>
                                            <option value="11">รถระหว่างประเทศ</option>

                                        </select>
                                    </div>

                                    <div class="form3 col-lg-4 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา อังกฤษ (อ่าน) </h5>
                                        <select data-placeholder="อังกฤษ (อ่าน)" v-model="dataForm.reng">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                    <div class="form3 col-lg-4 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา อังกฤษ (เขียน) </h5>
                                        <select data-placeholder="อังกฤษ (เขียน)" v-model="dataForm.weng">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                    <div class="form3 col-lg-4 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา อังกฤษ (พูด) </h5>
                                        <select data-placeholder="อังกฤษ (พูด)" v-model="dataForm.seng">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>

                                    <div class="form3 col-lg-4 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา จีน (อ่าน) </h5>
                                        <select data-placeholder="อังกฤษ (อ่าน)" v-model="dataForm.rch">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                    <div class="form3 col-lg-4 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา จีน (เขียน) </h5>
                                        <select data-placeholder="อังกฤษ (เขียน)" v-model="dataForm.wch">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                    <div class="form3 col-lg-4 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา จีน (พูด) </h5>
                                        <select data-placeholder="อังกฤษ (พูด)" v-model="dataForm.sch">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>

                                    <div class="form3 col-lg-3 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา อื่น (ระบุ) </h5>
                                        <input data-role="tagsinput" class="search-field" type="text" placeholder="" v-model="dataForm.oth" />
                                    </div>
                                    <div class="form3 col-lg-3 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา อื่น (อ่าน) </h5>
                                        <select data-placeholder="อังกฤษ (อ่าน)" v-model="dataForm.roth">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                    <div class="form3 col-lg-3 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา อื่น (เขียน) </h5>
                                        <select data-placeholder="อังกฤษ (เขียน)" v-model="dataForm.woth">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                    <div class="form3 col-lg-3 col-sm-12 col-xs-12">
                                        <h5>ทักษะด้านภาษา อื่น (พูด) </h5>
                                        <select data-placeholder="อังกฤษ (พูด)" v-model="dataForm.soth">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>

                                    <div class="form3 col-lg-3 col-sm-8 col-xs-12">
                                        <h5>ท่านเคยเจ็บป่วยขนาดหนัก หรือมีโรคติดต่อร้ายแรงหรือไม่</h5>
                                        <select data-placeholder="เลือกมีโรคติดต่อร้ายแรง" v-model="dataForm.sick">
                                            <option value="0" selected>ไม่เคย</option>
                                            <option value="1">เคย</option>

                                        </select>
                                    </div>

                                    <div class="form3 col-lg-2 col-sm-8 col-xs-12">
                                        <h5>ท่ายเคยเป็นโรคติดต่อ ระบุ </h5>
                                        <input class="search-field" type="text" placeholder="" v-model="dataForm.sickname" />
                                    </div>

                                    <div class="form3 col-lg-3 col-sm-8 col-xs-12">
                                        <h5>ท่ายเคยถูกจับกุม หรือต้องโทษในคดีอาญาหรือไม่</h5>
                                        <select data-placeholder="เลือกต้องโทษในคดีอาญาหรือไม่" v-model="dataForm.raw">
                                            <option value="0" selected>ไม่เคย</option>
                                            <option value="1">เคย</option>

                                        </select>
                                    </div>

                                    <div class="form3 col-lg-4 col-sm-8 col-xs-12">
                                        <h5>ท่านยินดีให้ตรวจสอบประวัติอาชญากรรมโดยการพิมพ์ลายนิ้วมือหรือไม่</h5>
                                        <select data-placeholder="เลือกให้ตรวจสอบประวัติอาชญากรรม" v-model="dataForm.rawok">
                                            <option value="0" selected>ไม่เคย</option>
                                            <option value="1">เคย</option>

                                        </select>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <!--  <button type="submit" class="button margin-top-15"> <i class="fa fa-save"></i> บันทึกข้อมูล</button>-->
                    </div>

                </div>
                <br><br><br>
            </form>
        </div>
    </memberLayout>

</div>
</template>

<script>
//import $ from 'jquery'
//import chosenSelect from 'chosen-js' 
import memberLayout from '@/components/member-layouts/index'
export default {
    components: {
        memberLayout
    },
    created() {

        let loginData = JSON.parse(this.$store.state.user.data)
        this.profileid = loginData.idcard
        this.getData()

    },
    mounted() {
        if (!this.$store.getters['user/isUser']) {
            this.alertAccess();
        }
    },
    data() {
        return {
            profileid: null,
            dataForm: {
                topic: '',
                detail: '',
                reng: 25,
                weng: 25,
                seng: 25,
                rch: 25,
                wch: 25,
                sch: 25,
                roth: 25,
                woth: 25,
                soth: 25,
                workname: '',
                workid: 0,
                raw: 0,
                rawok: 0,
                certcarid: 6,
                sick: 1,
                sickname: ''

            }
        }
    },

    methods: {

        alertAccess: function () {
            this.$fire({
                title: "ข้อมูลความสามารถพิเศษ",
                text: "ไม่อนุญาติ",
                type: "warning",
                timer: 3000
            }).then(() => {
               // this.$router.push('/home')
               window.location.href = '/home';
            })
        },

        alertSuccess: function () {
            this.$fire({
                title: "ข้อมูลความสามารถพิเศษ",
                text: 'บันทึกเรียบร้อยแล้ว',
                type: "success",
                timer: 3000
            })
        },
        alertLoginFail: function () {
            this.$fire({
                title: "ข้อมูลความสามารถพิเศษ",
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
        async saveData() {

            //$('.chosen-select').trigger('chosen:updated');
            //console.log(this.dataForm)

            try {
                await this.$http.post(`api/knowledge/${this.profileid}`, this.dataForm)

                this.alertSuccess()

            } catch (err) {
                console.log(err)
                this.alertLoginFail();
            }

        },
        async getData() {
            try {

                const {
                    data
                } = await this.$http.get(`api/knowledge/profile/${this.profileid}`)

                if (data.success && data.data) {
                    this.dataForm = data.data
                    // console.log(this.dataForm)
                }

            } catch (err) {
                console.log(err)
                this.alertLoginFail();
            }
        }
    }
}
</script>

<style scoped>
h5 {
    font-weight: bold;
}

.form2 {
    margin: 0;
    width: 25%;
    padding: 0 10px;
    margin-bottom: 25px;
}

.form3 {
    margin: 0;
    padding: 0 10px;
    margin-bottom: 25px;
}

select {
    padding: 14px 18px;
    outline: none;
    font-size: 14px;
    color: #909090;
    margin: 0;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    display: block;
    background-color: #fcfcfc;
    font-weight: 500;
    border: 1px solid #e0e0e0;
    opacity: 1;
}
</style>

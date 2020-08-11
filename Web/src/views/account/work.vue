<template>
<div>

    <memberLayout>
        <div slot="content">
            <!-- Titlebar -->
 <form id="frmData" ref="frmdata" @submit.prevent="saveData">
            <div class="row">

                <div class="col-lg-4 col-md-12">

                    <div class="dashboard-list-box margin-top-0">
                        <h4>ข้อมูลการทำงาน 1</h4>
                        <div class="dashboard-list-box-content">

                            <div class="submit-page">

                                <div class="form" style="width:100%">
                                    <h5>สถานที่ทำงาน (ชื่อ/สถานที่)</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="work1.workplace" />
                                </div>

                                <div class="form">
                                    <h5>ระยะเวลาปี (จาก)</h5>
                                    <input class="search-field" type="number" placeholder="" v-model="work1.begintime" maxlength="4" />
                                </div>

                                <div class="form">
                                    <h5>ระยะเวลาปี (ถีง)</h5>
                                    <input class="search-field" type="number" placeholder="" v-model="work1.endtime" maxlength="4"/>
                                </div>

                                <div class="form">
                                    <h5>ตำแหน่งงาน</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="work1.position" />
                                </div>

                                <div class="form">
                                    <h5>ค้าจ้างเงินเดือนก่อนออก</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="work1.salary" />
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>ลักษณะงานโดยย่อ</h5>
                                    <textarea name="notes" id="notes" cols="30" rows="5" v-model="work1.detail">xx xx xx</textarea>
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>เหตุผลที่ออกงาน</h5>
                                    <textarea name="notes" id="notes" cols="30" rows="5" v-model="work1.note">xx xx xx</textarea>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <div class="col-lg-4 col-md-12">

                    <div class="dashboard-list-box margin-top-0">
                        <h4>ข้อมูลการทำงาน 2</h4>
                        <div class="dashboard-list-box-content">

                           <div class="submit-page">

                                <div class="form" style="width:100%">
                                    <h5>สถานที่ทำงาน (ชื่อ/สถานที่)</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="work2.workplace" />
                                </div>

                                <div class="form">
                                    <h5>ระยะเวลาปี (จาก)</h5>
                                    <input class="search-field" type="number" placeholder="" v-model="work2.begintime" maxlength="4" />
                                </div>

                                <div class="form">
                                    <h5>ระยะเวลาปี (ถีง)</h5>
                                    <input class="search-field" type="number" placeholder="" v-model="work2.endtime" maxlength="4"/>
                                </div>

                                <div class="form">
                                    <h5>ตำแหน่งงาน</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="work2.position" />
                                </div>

                                <div class="form">
                                    <h5>ค้าจ้างเงินเดือนก่อนออก</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="work2.salary" />
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>ลักษณะงานโดยย่อ</h5>
                                    <textarea name="notes" id="notes" cols="30" rows="5" v-model="work2.detail">xx xx xx</textarea>
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>เหตุผลที่ออกงาน</h5>
                                    <textarea name="notes" id="notes" cols="30" rows="5" v-model="work2.note">xx xx xx</textarea>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <div class="col-lg-4 col-md-12">

                    <div class="dashboard-list-box margin-top-0">
                        <h4>ข้อมูลการทำงาน 3</h4>
                        <div class="dashboard-list-box-content">

                            <div class="submit-page">

                                <div class="form" style="width:100%">
                                    <h5>สถานที่ทำงาน (ชื่อ/สถานที่)</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="work3.workplace" />
                                </div>

                                <div class="form">
                                    <h5>ระยะเวลาปี (จาก)</h5>
                                    <input class="search-field" type="number" placeholder="" v-model="work3.begintime" maxlength="4" />
                                </div>

                                <div class="form">
                                    <h5>ระยะเวลาปี (ถีง)</h5>
                                    <input class="search-field" type="number" placeholder="" v-model="work3.endtime" maxlength="4"/>
                                </div>

                                <div class="form">
                                    <h5>ตำแหน่งงาน</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="work3.position" />
                                </div>

                                <div class="form">
                                    <h5>ค้าจ้างเงินเดือนก่อนออก</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="work3.salary" />
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>ลักษณะงานโดยย่อ</h5>
                                    <textarea name="notes" id="notes" cols="30" rows="5" v-model="work3.detail">xx xx xx</textarea>
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>เหตุผลที่ออกงาน</h5>
                                    <textarea name="notes" id="notes" cols="30" rows="5" v-model="work3.note">xx xx xx</textarea>
                                </div>

                            </div>

                        </div>
                    </div>

                    <button type="submit" class="button margin-top-15"> <i class="fa fa-save"></i> บันทึกข้อมูล</button>

                </div>

            </div>
 </form>


        </div>
    </memberLayout>

</div>
</template>

<script>
import memberLayout from '@/components/member-layouts/index'
export default {
    components: {
        memberLayout
    },
    created() {
        let loginData = JSON.parse(this.$store.state.user.data)
        this.profileid = loginData.idcard

        this.getData()
    },mounted() {
        if(!this.$store.getters['user/isUser']) {
          this.alertAccess();
        }
    },
    data() {
        return {
            profileid: null,
            work1: {
                workno:1,
                workplace: '',
                begintime: '',
                endtime: '',
                position: '',
                salary: '',
                detail: '',
                note: ''
            },
            work2: {
                workno:2,
                workplace: '',
                begintime: '',
                endtime: '',
                position: '',
                salary: '',
                detail: '',
                note: ''
            },
            work3: {
                workno:3,
                workplace: '',
                begintime: '',
                endtime: '',
                position: '',
                salary: '',
                detail: '',
                note: ''
            },
        }
    }, 
    methods : {

alertAccess: function () {
            this.$fire({
                title: "ประวัติการทำงาน",
                text: "ไม่อนุญาติ",
                type: "warning",
                timer: 3000
            }).then(()=>{
                this.$router.push('/home')
            })
        },

          alertSuccess: function () {
            this.$fire({
                title: "ประวัติการทำงาน",
                text: 'บันทึกเรียบร้อยแล้ว',
                type: "success",
                timer: 3000
            })
        },
        alertLoginFail: function () {
            this.$fire({
                title: "ประวัติการทำงาน",
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
        async saveData() {

            try {
                await this.$http.post(`api/work/${this.profileid}/${this.work1.workno}`, this.work1)
                await this.$http.post(`api/work/${this.profileid}/${this.work2.workno}`, this.work2)
                await this.$http.post(`api/work/${this.profileid}/${this.work3.workno}`, this.work3)

                this.alertSuccess()

            } catch (err) {
                console.log(err)
                this.alertLoginFail();
            }
        },
         async getDataWork(workno) {

            try {
                const {
                    data
                } = await this.$http.get(`api/work/profile/${this.profileid}/${workno}`)
                
                if (data.success && data.data) {
                    return data;
                } else {
                    return null;
                }
            } catch (err) {
                return null;
            }

        },
        async getData() {
            try {

               await this.getDataWork('1').then((data) => {
                    this.work1 = data.data;
                })
               await this.getDataWork('2').then((data) => {
                    this.work2 = data.data;
                })
              await  this.getDataWork('3').then((data) => {
                    this.work3 = data.data;
                })

            } catch (err) {
                console.log(err)
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
</style>

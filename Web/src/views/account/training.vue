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
                <div class="col-lg-4 col-md-12">

                    <div class="dashboard-list-box margin-top-0">
                        <h4>ข้อมูลการฝึกอบรม 1</h4>
                        <div class="dashboard-list-box-content">

                            <div class="submit-page">

                                <div class="form" style="width:100%">
                                    <h5>หลักสูตร / วิชา ที่อบรม</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="train1.course" />
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>สถาบันที่จัด</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="train1.location" />
                                </div>

                                <div class="form" v-show="0">
                                    <h5>ระยะเวลา (จาก)</h5>
                                    <input class="search-field" type="number" placeholder=""  />
                                </div>

                                <div class="form" v-show="0">
                                    <h5>ระยะเวลา (ถีง)</h5>
                                    <input class="search-field" type="number" placeholder=""  />
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>ปีที่อบรม</h5>
                                    <input class="search-field" type="text" placeholder=""  v-model="train1.tyear"/>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <div class="col-lg-4 col-md-12">

                    <div class="dashboard-list-box margin-top-0">
                        <h4>ข้อมูลการฝึกอบรม 2</h4>
                        <div class="dashboard-list-box-content">

                             <div class="submit-page">

                                <div class="form" style="width:100%">
                                    <h5>หลักสูตร / วิชา ที่อบรม</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="train2.course" />
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>สถาบันที่จัด</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="train2.location" />
                                </div>

                                <div class="form" v-show="0">
                                    <h5>ระยะเวลา (จาก)</h5>
                                    <input class="search-field" type="number" placeholder=""  />
                                </div>

                                <div class="form" v-show="0">
                                    <h5>ระยะเวลา (ถีง)</h5>
                                    <input class="search-field" type="number" placeholder=""  />
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>ปีที่อบรม</h5>
                                    <input class="search-field" type="text" placeholder=""  v-model="train2.tyear"/>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <div class="col-lg-4 col-md-12">

                    <div class="dashboard-list-box margin-top-0">
                        <h4>ข้อมูลการฝึกอบรม 3</h4>
                        <div class="dashboard-list-box-content">

                             <div class="submit-page">

                                <div class="form" style="width:100%">
                                    <h5>หลักสูตร / วิชา ที่อบรม</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="train3.course" />
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>สถาบันที่จัด</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="train3.location" />
                                </div>

                                <div class="form" v-show="0">
                                    <h5>ระยะเวลา (จาก)</h5>
                                    <input class="search-field" type="number" placeholder=""  />
                                </div>

                                <div class="form" v-show="0">
                                    <h5>ระยะเวลา (ถีง)</h5>
                                    <input class="search-field" type="number" placeholder=""  />
                                </div>

                                <div class="form" style="width:100%">
                                    <h5>ปีที่อบรม</h5>
                                    <input class="search-field" type="text" placeholder="" v-model="train3.tyear" />
                                </div>

                            </div>

                        </div>
                    </div>

                 <!--  <button type="submit" class="button margin-top-15"> <i class="fa fa-save"></i> บันทึกข้อมูล</button> -->

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
            train1: {
                trainno:1,
                course:'',
                location:'',
                tyear:''
            },
            train2: {
                trainno:2,
                course:'',
                location:'',
                tyear:''
            },
            train3: {
                trainno:3,
                course:'',
                location:'',
                tyear:''
            },
        }
    }, 
    methods : {

alertAccess: function () {
            this.$fire({
                title: "ประวัติการฝึกอบรม",
                text: "ไม่อนุญาติ",
                type: "warning",
                timer: 3000
            }).then(()=>{
                this.$router.push('/home')
            })
        },

          alertSuccess: function () {
            this.$fire({
                title: "ประวัติการฝึกอบรม",
                text: 'บันทึกเรียบร้อยแล้ว',
                type: "success",
                timer: 3000
            }).then(()=>{
                this.$router.push('/knowledge')
            })
        },
        alertLoginFail: function () {
            this.$fire({
                title: "ประวัติการฝึกอบรม",
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
        async saveData() {

            try {
                await this.$http.post(`api/training/${this.profileid}/${this.train1.trainno}`, this.train1)
                await this.$http.post(`api/training/${this.profileid}/${this.train2.trainno}`, this.train2)
                await this.$http.post(`api/training/${this.profileid}/${this.train3.trainno}`, this.train3)

                this.alertSuccess()

            } catch (err) {
                console.log(err)
                this.alertLoginFail();
            }
        },
         async getDatas(trainno) {

            try {
                const {
                    data
                } = await this.$http.get(`api/training/profile/${this.profileid}/${trainno}`)
                
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

               await  this.getDatas('1').then((data) => {
                    this.train1 = data.data;
                })
               await this.getDatas('2').then((data) => {
                    this.train2 = data.data;
                })
               await this.getDatas('3').then((data) => {
                    this.train3 = data.data;
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

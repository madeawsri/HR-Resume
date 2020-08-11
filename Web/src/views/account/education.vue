<template>
<div>

    <memberLayout>
        <div slot="content">
            <!-- Titlebar -->

            <div class="row">
                <form id="frmData" ref="frmdata" @submit.prevent="saveData">
                    <!-- Table-->
                    <div class="col-lg-12 col-md-12">
                        <p style="margin-left:5px">
                            <button type="submit" class="button margin-top-0"> <i class="fa fa-save"></i> บันทึกข้อมูล</button>
                        </p>
                        <div class="dashboard-list-box margin-top-10">
                            <h4>ข้อมูลการศึกษา (ประถมศึกษา)</h4>
                            <div class="dashboard-list-box-content with-padding ">

                                <div class="submit-page ">
                                    <div class="col-lg-3 col-md-6">

                                        <h5>ชื่อสถาบัน</h5>
                                        <input class="search-field" type="text" v-model="level1.institution" />

                                    </div>

                                    <div class="col-lg-3 col-md-6">

                                        <h5>สาขาวิชาที่จบ</h5>
                                        <input class="search-field" type="text" v-model="level1.subject" />

                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (เริ่ม)</h5>
                                        <input class="search-field" type="number" v-model="level1.begintime" />
                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (จบ)</h5>
                                        <input class="search-field" type="number" v-model="level1.endtime" />
                                    </div>

                                    <div class="col-lg-1 col-md-6">
                                        <h5>เกรดเฉลี่ย</h5>
                                        <input class="search-field" type="number" step="0.01" min="0" max="4" v-model="level1.gpa" />
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="dashboard-list-box margin-top-30">
                            <h4>ข้อมูลการศึกษา (มัธยมศึกษา)</h4>
                            <div class="dashboard-list-box-content with-padding">
                                <div class="submit-page ">
                                    <div class="col-lg-3 col-md-6">

                                        <h5>ชื่อสถาบัน</h5>
                                        <input class="search-field" type="text" v-model="level2.institution" />

                                    </div>

                                    <div class="col-lg-3 col-md-6">

                                        <h5>สาขาวิชาที่จบ</h5>
                                        <input class="search-field" type="text" v-model="level2.subject" />

                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (เริ่ม)</h5>
                                        <input class="search-field" type="number" v-model="level2.begintime" />
                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (จบ)</h5>
                                        <input class="search-field" type="number" v-model="level2.endtime" />
                                    </div>

                                    <div class="col-lg-1 col-md-6">
                                        <h5>เกรดเฉลี่ย</h5>
                                        <input class="search-field" type="number" step="0.01" min="0" max="4" v-model="level2.gpa" />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="dashboard-list-box margin-top-30">
                            <h4>ข้อมูลการศึกษา (อาชีวศึกษา)</h4>
                            <div class="dashboard-list-box-content with-padding">
                                <div class="submit-page ">
                                    <div class="col-lg-3 col-md-6">

                                        <h5>ชื่อสถาบัน</h5>
                                        <input class="search-field" type="text" v-model="level3.institution" />

                                    </div>

                                    <div class="col-lg-3 col-md-6">

                                        <h5>สาขาวิชาที่จบ</h5>
                                        <input class="search-field" type="text" v-model="level3.subject" />

                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (เริ่ม)</h5>
                                        <input class="search-field" type="number" v-model="level3.begintime" />
                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (จบ)</h5>
                                        <input class="search-field" type="number" v-model="level3.endtime" />
                                    </div>

                                    <div class="col-lg-1 col-md-6">
                                        <h5>เกรดเฉลี่ย</h5>
                                        <input class="search-field" type="number" step="0.01" min="0" max="4" v-model="level3.gpa" />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="dashboard-list-box margin-top-30">
                            <h4>ข้อมูลการศึกษา (ปริญญาตรี)</h4>
                            <div class="dashboard-list-box-content with-padding">
                                <div class="submit-page ">
                                    <div class="col-lg-3 col-md-6">

                                        <h5>ชื่อสถาบัน</h5>
                                        <input class="search-field" type="text" v-model="level4.institution" />

                                    </div>

                                    <div class="col-lg-3 col-md-6">

                                        <h5>สาขาวิชาที่จบ</h5>
                                        <input class="search-field" type="text" v-model="level4.subject" />

                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (เริ่ม)</h5>
                                        <input class="search-field" type="number" v-model="level4.begintime" />
                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (จบ)</h5>
                                        <input class="search-field" type="number" v-model="level4.endtime" />
                                    </div>

                                    <div class="col-lg-1 col-md-6">
                                        <h5>เกรดเฉลี่ย</h5>
                                        <input class="search-field" type="number" step="0.01" min="0" max="4" v-model="level4.gpa" />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="dashboard-list-box margin-top-30">
                            <h4>ข้อมูลการศึกษา (ปริญญาโท)</h4>
                            <div class="dashboard-list-box-content with-padding">
                                <div class="submit-page ">
                                    <div class="col-lg-3 col-md-6">

                                        <h5>ชื่อสถาบัน</h5>
                                        <input class="search-field" type="text" v-model="level5.institution" />

                                    </div>

                                    <div class="col-lg-3 col-md-6">

                                        <h5>สาขาวิชาที่จบ</h5>
                                        <input class="search-field" type="text" v-model="level5.subject" />

                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (เริ่ม)</h5>
                                        <input class="search-field" type="number" v-model="level5.begintime" />
                                    </div>

                                    <div class="col-lg-2 col-md-6">
                                        <h5>ปีการศึกษา (จบ)</h5>
                                        <input class="search-field" type="number" v-model="level5.endtime" />
                                    </div>

                                    <div class="col-lg-1 col-md-6">
                                        <h5>เกรดเฉลี่ย</h5>
                                        <input class="search-field" type="number" step="0.01" min="0" max="4" v-model="level5.gpa" />
                                    </div>

                                </div>
                            </div>
                        </div>
<div>&nbsp;<br></div>
                    </div>
                </form>
            </div>

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
    },
    mounted() {
        if (!this.$store.getters['user/isUser']) {
            this.alertAccess();
        }
    },
    data() {
        return {
            profileid: null,
            level1: {
                levelid: 1,
                institution: '',
                subject: '',
                begintime: 0,
                endtime: 0,
                gpa: 0.00
            },
            level2: {
                levelid: 2,
                institution: '',
                subject: '',
                begintime: 0,
                endtime: 0,
                gpa: 0.00
            },
            level3: {
                levelid: 3,
                institution: '',
                subject: '',
                begintime: 0,
                endtime: 0,
                gpa: 0.00
            },
            level4: {
                levelid: 4,
                institution: '',
                subject: '',
                begintime: 0,
                endtime: 0,
                gpa: 0.00
            },
            level5: {
                levelid: 5,
                institution: '',
                subject: '',
                begintime: 0,
                endtime: 0,
                gpa: 0.00
            }
        }
    },
    methods: {
        alertAccess: function () {
            this.$fire({
                title: "ประวัติการศึกษา",
                text: "ไม่อนุญาติ",
                type: "warning",
                timer: 3000
            }).then(() => {
                this.$router.push('/home')
            })
        },
        alertSuccess: function () {
            this.$fire({
                title: "ประวัติการศึกษา",
                text: 'บันทึกเรียบร้อยแล้ว',
                type: "success",
                timer: 3000
            }).then(()=>{
                this.$router.push('/work')
            })
        },
        alertLoginFail: function () {
            this.$fire({
                title: "ประวัติการศึกษา",
                text: 'ไม่สามารถเข้าใช้งานได้ ลองใหม่อีกครั้งครับ.',
                type: "warning",
                timer: 3000
            })
        },
        async saveData() {

            try {
                await this.$http.post(`api/education/${this.profileid}/${this.level1.levelid}`, this.level1)
                await this.$http.post(`api/education/${this.profileid}/${this.level2.levelid}`, this.level2)
                await this.$http.post(`api/education/${this.profileid}/${this.level3.levelid}`, this.level3)
                await this.$http.post(`api/education/${this.profileid}/${this.level4.levelid}`, this.level4)
                await this.$http.post(`api/education/${this.profileid}/${this.level5.levelid}`, this.level5)

                this.alertSuccess()

            } catch (err) {
                console.log(err)
                this.alertLoginFail();
            }
        },
        async getDataEducation(levelid) {

            try {
                const {
                    data
                } = await this.$http.get(`api/education/profile/${this.profileid}/${levelid}`)

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

                await this.getDataEducation('1').then((data) => {
                    this.level1 = data.data;
                })
                await this.getDataEducation('2').then((data) => {
                    this.level2 = data.data;
                })
                await this.getDataEducation('3').then((data) => {
                    this.level3 = data.data;
                })
                await this.getDataEducation('4').then((data) => {
                    this.level4 = data.data;
                })
                await this.getDataEducation('5').then((data) => {
                    this.level5 = data.data;
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
</style>

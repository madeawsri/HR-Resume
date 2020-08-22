<template>
<memberLayout>
    <div slot="content">

        <div class="col-lg-12 col-md-12">
            <form @submit.prevent="sendData">
                <div class="dashboard-list-box margin-top-0">
                    <h4>{{headTitle}}
                        <button type="submit" class="button margin-bottom-0  float-xl-right pull-right "> {{editForm.modeTitle}} <i class="fa fa-arrow-circle-right"></i></button>
                    </h4>

                    <div class="dashboard-list-box-content">

                        <div class="submit-page">
                            <div class="form">
                                <h5> รายชื่อผู้สมัคร : {{dataForm.topic}}</h5>
                                <v-multiselect placeholder="รายชื่อผู้สมัคร " label="idcard" track-by="topic" v-model="dataForm.member" :options="lstMebers" :multiple="false" :close-on-select="true" :hide-selected="true" :show-labels="false" @select="selectIdcard"></v-multiselect>
                            </div>
                            <div class="form">
                                <h5> ตำแหน่งเปิดรับสมัคร </h5>
                                <v-multiselect placeholder="รายชื่อผู้สมัคร " label="topic" track-by="topic" v-model="dataForm.job" :options="lstJobs" :multiple="false" :close-on-select="true" :hide-selected="true" :show-labels="false" @select="selectJob"></v-multiselect>
                            </div>
                        </div>

                    </div>
                </div>
            </form>

            <div class="dashboard-list-box margin-top-30">
                <div class="dashboard-list-box-content">
                    <div v-show="!Object.keys(this.lstProfile).length ">ไม่พบข้อมูล!!</div>
                    <div id="titlebar" class="resume" style="margin:20px;" v-show="Object.keys(this.lstProfile).length ">

                        <div class="ten columns">
                            <div class="resume-titlebar">
                                <img :src="profileImg" alt="" class="margin-top-20">

                                <div class="resumes-list-content">
                                    <h4>ตำแหน่งที่สนใจ : <span>{{jobInter}}</span> </h4>
                                </div>
                            </div>
                        </div>

                        <div class="six columns" v-if="0">
                            <div class="two-buttons">
                                <a href="" class="popup-with-zoom-anim button"><i class="fa fa-file-pdf-o"></i> นำออกไฟล์ PDF (Resume)</a>
                            </div>
                        </div>

                        <div class="ten columns">
                            <div class="padding-right margin-top-30">
                                <p style="margin-bottom:2px;font-size:18px;"><strong>เลขบัตรประจำตัวประชาชน</strong>: {{lstProfile.profileid}} <strong>ชื่อ-สกุล</strong> : {{lstProfile.nameth}}</p>
                                <p style="margin-bottom:2px;font-size:18px;"><strong>น้ำหนัก</strong>: {{lstProfile.weight}} <strong> กิโลกรัม</strong> <strong>ส่วนสูง</strong>: {{lstProfile.height}} <strong>เซ็นติเมตร</strong></p>
                                <p style="margin-bottom:2px;font-size:18px;"><strong>วันเกิด</strong>: {{lstProfile.birthday}} <strong>อายุ</strong>: {{ lstProfile.cbirthday | moment("from", "now", true) }} </p>
                                <p style="margin-bottom:2px;font-size:18px;"><strong>เบอร์โทรที่ติดต่อได้</strong>: {{lstProfile.phone}} </p>
                                <p style="margin-bottom:2px;font-size:18px;"><strong>อีเมล์</strong>: {{lstProfile.email}} <strong>ไลน์ไอดี</strong>: {{lstProfile.lineid}}</p>
                                <p style="margin-bottom:2px;font-size:18px;"><strong>ประเภทใบอนุญาตขับขี่</strong>: {{lstProfile.carid}} </p>
                                <p style="margin-bottom:2px;font-size:18px;">
                                    <strong>วุฒิการศึกษาสูงสุด</strong>: {{getValue(lstProfile.edu,0) }} <!--{{ lstProfile.edu | getArray(0) }}-->
                                    <strong>สาขา</strong>: {{getValue(lstProfile.edu,1) }}
                                    <strong>ปีที่จบ</strong>: {{getValue(lstProfile.edu,3) }}
                                    <strong>เกรดเฉลี่ย</strong>: {{getValue(lstProfile.edu,4) }}
                                </p>
                                <p style="margin-bottom:2px;font-size:18px;"><strong>ประสบการณ์ทำงาน</strong>:</p>
                                <ul class="list-1" v-for="(item, index) in lstWorks" :key="index">

                                    <li style="padding:0px;">
                                        <p style="margin-bottom:0px;font-size:18px;">
                                            <strong>สถานที่ทำงาน</strong>: {{item.workplace}}
                                            <strong>ระยะเวลา</strong>: {{item.endtime - item.begintime}} <strong>ปี </strong>
                                            <strong>ตำแหน่ง</strong> {{item.position}}
                                            <strong>เงินเดือน</strong> {{(item.salary*1).toLocaleString()}} <strong> บาท</strong>
                                        </p>
                                    </li>

                                </ul>

                            </div>
                        </div>

                        <br>

                    </div>

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
    },
    mounted() {
        if (!this.$store.getters['user/isWebAdmin']) {
            this.alertAccess();
        }
        /*
                let ttt = [{
                    id: 1
                }, {
                    id: 2
                }, {
                    id: 3
                }, {
                    id: 4
                }, {
                    id: 5
                }];
                let aaa = [{
                    id: 1
                }, {
                    id: 5
                }];
                let output = ttt.filter(a => aaa.findIndex(b => b.id == a.id) < 0);

                console.log(output)
                */

    },
    async created() {
        await this.getLstDatas();
        //await this.showDataAll();
    },
    data() {
        return {

            isLoading: false,
            headTitle: 'จัดการผู้สมัคร',
            editForm: {
                keydb: 0,
                index: 0,
                mode: "save",
                modeTitle: "บันทึกข้อมูล"
            },
            dataForm: {
                topic: '',
                job: [],
                member: []

            },
            dataFormReset: {
                ...this.dataForm
            },
            lstProfile: {},
            lstWorks: [],
            profileImg: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&amp;s=300",
            lstEducation: [],
            lstMebers: [],
            lstJobs: [],
            lstJobsCopy: [],
            jobInter: " -- ไม่พบข้อมูล --",
            listDatas: [{
                id: 1,
                topic: 'xxx'
            }] // data in table

        }
    },
    methods: {
        getValue(arr, i) {
            if (arr == undefined) {
                return ' - '
            } else {
                return arr[i]
            }
        },
        async loadMyPicture(idcard) {
            try {
                const {
                    data
                } = await this.$http.get(`api/profile/img/${idcard}`)
                if (data.success) {
                    //console.log('OK my picture')
                    this.profileImg = `data:image/png;base64,${data.data}`
                } else {
                    this.profileImg = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&amp;s=300"
                }
            } catch (err) {
                console.log(err)
            }
        },
        getWork: async function (idcard) {
            try {
                const {
                    data
                } = await this.$http.get(`api/work/profile/${idcard}`)
                if (data.success == 1) {
                    if (data.data !== null) {

                        this.lstWorks = [...data.data]
                        console.log(this.lstWorks)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        getJobIn: async function (idcard) {
            try {
                console.log("job id")
                const {
                    data
                } = await this.$http.get(`api/jobinterest/${idcard}`)
                if (data.success == 1) {
                    if (data.data !== null) {

                        console.log(data.data)
                        this.jobInter = [...data.data].map((it) => it.pname).join(',');
                        this.lstJobs = this.lstJobs.filter(a => data.data.findIndex(b => b.jobid == a.id) < 0);
                        console.log(this.lstJobs)

                    } else {
                        this.jobInter = " -- ไม่พบข้อมูล --"
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        selectJob: async function (item) {

            console.log(item)

        },
        selectIdcard: async function (item) {
            console.log(item)
            this.lstJobs = [...this.lstJobsCopy]
            console.log(this.lstJobs)
            this.dataForm.topic = item.nameth
            await this.getWork(item.idcard)
            await this.loadMyPicture(item.idcard)
            await this.getJobIn(item.idcard)
            try {
                const {
                    data
                } = await this.$http.get(`api/profile/${item.idcard}`)
                if (data.success == 1) {
                    if (data.data !== null) {
                        this.lstProfile = data.data

                        if (this.lstProfile.carid)
                            this.lstProfile.carid = this.$store.state.jobs.ctype.find(x => x.id == this.lstProfile.carid).topic

                        if (data.data.edu != null) {
                            let edu = this.lstProfile.edu.split("|")
                            let levelTopic = this.$store.state.jobs.etype
                            edu[0] = levelTopic.find(x => x.id == edu[0]).topic;
                            this.lstProfile.edu = edu
                        } else {
                            this.lstEducation = []
                        }

                    } else {
                        this.lstProfile = {}
                        this.lstEducation = []
                    }

                    //console.log(this.lstProfile)
                }
                //console.log(data)
            } catch (e) {
                console.log(e)
            }

        },
        alertAccess: function () {
            this.$fire({
                title: this.headTitle,
                text: "ไม่อนุญาติ",
                type: "warning",
                timer: 3000
            }).then(() => {
                //this.$router.push('/home')
                window.location.href = '/home';
            })
        },
        getLstDatas: async function () {
            try {

                const dataM = await this.$http.get('api/register/all')
                const dataJ = await this.$http.get('api/jobs/list')

                this.$http.all([dataM, dataJ]).then(
                    this.$http.spread((...res) => {
                        this.lstMebers = res[0].data.data
                        this.lstJobs = res[1].data.data
                        this.lstJobsCopy = [...this.lstJobs]
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
                console.log('save')
                if (this.dataForm.member.length === 0 || this.dataForm.job.length === 0) {
                    console.log("Input not yet!")
                } else {
                    const saveData = {
                        idcard: this.dataForm.member.idcard,
                        jobid: this.dataForm.job.id,
                        regstatus: 1
                    }
                    console.log(saveData)
                }

            } catch (e) {
                console.log(e)
                this.alertFail()
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

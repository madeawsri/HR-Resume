<template lang="dateFormatThai">
<memberLayout>
    <div slot="content">

        <div class="col-lg-12 col-md-12">
            <form @submit.prevent="sendData">
                <div class="dashboard-list-box margin-top-0">
                    <h4>{{headTitle}}
                        <button type="button" v-show="isSelectJob" class="button margin-bottom-0  float-xl-right pull-right " @click="alertLineNotify"> นัดสัมภาษณ์ LineNotify </button>
                        <!--<a href="#" @click="alertLineNotify" v-show="isSelectJob" class="button" style="margin-right:5px;"> นัดสัมภาษณ์ LineNotify </a>-->
                    </h4>

                    <div class="dashboard-list-box-content">

                        <div class="submit-page">
                            <div class="form" style="width:35%">
                                <h5> ตำแหน่งเปิดรับสมัคร </h5>
                                <v-multiselect placeholder="รายชื่อผู้สมัคร " label="topic" track-by="topic" v-model="dataForm.job" :options="lstJobs" :multiple="false" :close-on-select="true" :hide-selected="true" :show-labels="false" @select="selectJob"></v-multiselect>
                            </div>
                            <div class="form" style="width:30%">
                                <h5> วันที่นัดสัมภาษณ์ </h5>
                                <v-date v-model="dataForm.nuddate" class="datetime-picker" value-type="format" format="YYYY-MM-DD" :lang="dateFormatThai" type="date" placeholder="วันที่นัดสัมภาษณ์"></v-date>
                            </div>
                            <div class="form" style="width:35%">
                                <h5> ข้อความถึงผู้สมัคร </h5>
                                <input type="text" v-model="dataForm.nudnote" class="form-control input-text" />
                            </div>

                        </div>

                    </div>
                </div>
            </form>
            <div class="dashboard-list-box margin-top-30">
                <div class="dashboard-list-box-content">

                    <!-- Table <i class="fa fa-check"></i>-->

                    <table class="manage-table responsive-table">

                        <tr>
                            <th style="width:15%"><i class="fa fa-tasks"></i>บัตรประชาชน</th>
                            <th><i class="fa fa-file-text"></i> ชื่อ-สกุล</th>
                            <th><i class="fa fa-file-text"></i> เบอร์โทร</th>
                            <th><i class="fa fa-file-text"></i> วันที่นัดสัมภาษณ์</th>
                            <th><i class="fa fa-file-text"></i> ข้อความถึงผู้สมัคร</th>
                            <th></th>

                        </tr>

                        <tr style="padding: 2px 2px;" v-for="(item, index) in lstProfile" :key="index">
                            <td style="padding: 2px 2px;font-weight:bold;" class="title"> {{item.profileid}}</td>
                            <td style="padding: 2px 2px;font-weight:bold;" class="title"> {{ item.nameth}}</td>
                            <td style="padding: 2px 2px;font-weight:bold;" class="title"> {{ item.phone || " - "}}</td>
                            <td style="padding: 2px 2px;font-weight:bold;" class="title"> {{item.nuddate | moment('DD MMMM YYYY')}}</td>
                            <td style="padding: 2px 2px;font-weight:bold;">{{item.nudnote}}</td>
                            <td style="padding: 2px 2px;">
                                <button @click="dialogInfo(item.profileid)" v-show="isSelectJob" class="button" style="margin-right:5px;"> นัดสัมภาษณ์ </button>
                            </td>
                        </tr>

                    </table>

                </div>
            </div>

            <div class="dashboard-list-box margin-top-30" v-show="0">
                <div class="" ref="info">

                    <div class="col-sm-4">
                        <img :src="profileImg" alt="" class="margin-top-0 img-rounded img-responsive">
                    </div>
                    <div class="col-sm-8" align="left">

                        <p style="margin-bottom:2px;font-size:16px;"><strong>เลขบัตรประจำตัวประชาชน</strong>: {{memberInfo.profileid}} </p>
                        <p style="margin-bottom:2px;font-size:16px;"><strong>ชื่อ-สกุล</strong> : {{memberInfo.nameth}}</p>
                        <p style="margin-bottom:2px;font-size:16px;"><strong>น้ำหนัก</strong>: {{memberInfo.weight}} <strong> กิโลกรัม</strong> <strong>ส่วนสูง</strong>: {{memberInfo.height}} <strong>เซ็นติเมตร</strong></p>
                        <p style="margin-bottom:2px;font-size:16px;"><strong>วันเกิด</strong>: {{memberInfo.birthday}} <br>
                            <strong>อายุ</strong>: {{ memberInfo.cbirthday | moment("from", "now", true) }}
                        </p>
                        <p style="margin-bottom:2px;font-size:16px;"><strong>เบอร์โทรที่ติดต่อได้</strong>: {{memberInfo.phone}} </p>
                        <p style="margin-bottom:2px;font-size:16px;"><strong>อีเมล์</strong>: {{memberInfo.email}} <br>
                            <strong>ไลน์ไอดี</strong>: {{memberInfo.lineid || " ไม่มีไลน์ไอดี "}}
                        </p>
                        <p style="margin-bottom:2px;font-size:16px;"><strong>ประเภทใบอนุญาตขับขี่</strong>: {{memberInfo.carid||"-"}} </p>
                        <p style="margin-bottom:2px;font-size:16px;">
                            <strong>วุฒิการศึกษาสูงสุด</strong>: {{getValue(memberInfo.edu,0) }}
                            <!--{{ lstProfile.edu | getArray(0) }}-->
                            <strong>สาขา</strong>: {{getValue(memberInfo.edu,1) }} <br>
                            <strong>ปีที่จบ</strong>: {{getValue(memberInfo.edu,3) }}
                            <strong>เกรดเฉลี่ย</strong>: {{getValue(memberInfo.edu,4) }}
                        </p>
                        <p style="margin-bottom:2px;font-size:16px;"><strong>ประสบการณ์ทำงาน</strong>:</p>
                        <ul class="list-1" v-for="(item, index) in lstWorks" :key="index">

                            <li style="padding:0px;">
                                <p style="margin-bottom:0px;font-size:16px;">
                                    <strong>สถานที่ทำงาน</strong>: {{item.workplace}}
                                    <strong>ระยะเวลา</strong>: {{item.endtime - item.begintime}} <strong>ปี </strong><br>
                                    <strong>ตำแหน่ง</strong> {{item.position}}
                                    <strong>เงินเดือน</strong> {{(item.salary*1).toLocaleString()}} <strong> บาท</strong>
                                </p>
                            </li>

                        </ul>

                        <div class="message-by">
                            <div class="message-by-headline">
                                <h5>ตำแหน่งที่รับสมัคร <i style="font-size:18px;">{{selectJobTopic || "คุณยังไม่เลือกงานที่สมัคร "}}</i></h5>
                                <h5>วันที่นัดสัมภาษณ์ <i style="font-size:18px;">{{dataForm.nuddate | moment('DD MMMM YYYY') }}</i></h5>
                                <h5>ข้อความถึงผู้สมัคร <i style="font-size:18px;">{{dataForm.nudnote || " - "}}</i></h5>
                            </div>

                        </div>

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
        let output = ttt.filter(a => aaa.findIndex(b => b.id == a.id) < 0);
        console.log(output)                
        */
    },
    async created() {
        await this.getLstDatas();
        this.lstProfileCopy = [...this.lstProfile]

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
            isSelectJob: false,
            selectJobTopic: "",
            selectJobId: "",
            headTitle: 'สิ้นสุดการทำงานสัญญา',
            editForm: {
                keydb: 0,
                index: 0,
                mode: "save",
                modeTitle: "บันทึกข้อมูล"
            },
            dataForm: {
                topic: '',
                nudnote: "มาสัมภาษณ์ภายในวันและเวลาทำการ",
                job: [],
                member: [],
                keyword: ""

            },
            dataFormReset: {
                ...this.dataForm
            },
            lstProfile: [],
            lstProfileCopy: [],
            memberInfo: {},
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
        applyJob: async function (idcard) {
            let saveData = {

                nudnote: this.dataForm.nudnote,
                nuddate: this.dataForm.nuddate,
                idcard: idcard,
                jobid: this.selectJobId

            }

            this.$http.put(`api/interview/${idcard}/${this.selectJobId}`, saveData).then((data) => {
                let obj = data.data

                if (obj.success) {

                    this.$fire({
                        title: "นัดสัมภาษณ์",
                        text: "เรียบร้อยแล้ว.",
                        type: "success",
                        timer: 3000
                    })

                } else {
                    this.$fire({
                        title: "นัดสัมภาษณ์",
                        text: "ระบบมีปัญหา กรุณาติดต่อเจ้าหน้าที่.",
                        type: "error",
                        timer: 3000
                    })
                }
                //console.log(obj)
            }).catch(e => {
                console.log(e)
                this.$fire({
                    title: "นัดสัมภาษณ์",
                    text: "ระบบมีปัญหา กรุณาติดต่อเจ้าหน้าที่.",
                    type: "error",
                    timer: 3000
                })
            })

            // console.log(saveData)

        },
        dialogInfo: async function (idcard) {

            console.log(this.$refs.info)

            if (this.dataForm.nuddate && this.dataForm.nudnote) {

                await this.getMemberInfo(idcard);
                await this.loadMyPicture(idcard);
                await this.getWork(idcard)
                this.$fire({
                    title: '<span style="text-align:left;">รายละเอียดผู้สมัคร</span>',
                    html: this.$refs.info,
                    width: 800,
                    showCloseButton: false,
                    cancelButtonText: 'ยกเลิก',
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'นัดสัมภาษณ์',
                    showLoaderOnConfirm: true,
                }).then(async (result) => {

                    if (result.value) {
                        try {
                            await this.applyJob(idcard);

                        } catch (e) {

                            console.log(e)

                        }
                    }
                })
            } else {
                this.$fire({
                    title: "นัดสัมภาษณ์",
                    text: "กรอกข้อมูลให้ครบ.",
                    type: "warning",
                    timer: 3000
                })
            }

        },
        getMemberInfo: async function (idcard) {
            console.log(idcard)

            try {
                const {
                    data
                } = await this.$http.get(`api/profile/${idcard}`)
                if (data.success == 1) {
                    //console.log(data.data)

                    if (data.data !== null) {
                        this.memberInfo = data.data

                        if (this.memberInfo.carid)
                            this.memberInfo.carid = this.$store.state.jobs.ctype.find(x => x.id == this.memberInfo.carid).topic

                        if (data.data.edu != null) {
                            let edu = this.memberInfo.edu.split("|")
                            let levelTopic = this.$store.state.jobs.etype
                            edu[0] = levelTopic.find(x => x.id == edu[0]).topic;
                            this.memberInfo.edu = edu
                        } else {
                            // this.lstEducation = []
                        }

                    } else {
                        this.memberInfo = {}
                        // this.lstEducation = []
                    }

                    //console.log(this.lstProfile)
                }
                //console.log(data)
            } catch (e) {
                console.log(e)
            }
        },
        findMember: function () {
            let keyword = this.dataForm.keyword

            if (keyword !== "")
                this.lstProfile = [...this.lstProfileCopy.filter(x => (String(x.edux).includes(keyword) ||
                    String(x.profileid).split(' ').join('').includes(keyword) ||
                    String(x.nameth).includes(keyword)))]
            else
                this.lstProfile = [...this.lstProfileCopy]

        },
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
        alertLineNotify: async function () {
            /*
                        let dataF = [
                            `ในวันที่ 2 เมษายน 2564  
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx`,
                            `ในวันที่ 3 เมษายน 2564  
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx`,
                            `ในวันที่ 4 เมษายน 2564  
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx
            - xxxxxxxxxx`
                        ]

                        let msgFormat = `
            ตรวจสอบรายชื่อนัดสัมภาษณ์ 
            ${dataF.join('\n')}
            ภายในเวลาทำการเท่านั้น
            `;
            */
            let msgFormat = `
ตรวจสอบรายชื่อนัดสัมภาษณ์ 
ตำแหน่ง : ${this.selectJobTopic} 
ตามลิงค์นี้ http://10.7.10.26:8081/jobdetail/${this.selectJobId}
            `;
            //let newData = [...this.lstProfile.filter(x => x.nuddate !== null)]
            //console.log(msgFormat)
            try {
                const {
                    data
                } = await this.$http.post(`api/linenotify`, {
                    message: msgFormat
                })
                if (data.success == 1) {
                    console.log('sent message in linenotify is succes')
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

            this.isSelectJob = true;
            this.selectJobTopic = item.topic
            this.selectJobId = item.id

            await this.getProfile(item.id);

            ///console.log(this.lstProfile.filter(x => (x.profileid === '2 2222 22222 22 2' && x.jobid === '12')))

        },
        getProfile: async function (jobid) {
            try {
                const {
                    data
                } = await this.$http.get(`api/interview/jobid/${jobid}`)
                console.log(" loading profile ")
                console.log(data)
                let objCtype = this.$store.state.jobs.ctype
                let levelTopic = this.$store.state.jobs.etype
                if (data.success == 1) {
                    if (data.data !== null) {
                        this.lstProfile = data.data

                        this.lstProfile.forEach(function (item) {
                            console.log(item.carid)
                            if (item.carid)
                                item.carid = objCtype.find(x => x.id == item.carid).topic
                            if (item.edu != null) {
                                let edu = item.edu.split("|")
                                edu[0] = levelTopic.find(x => x.id == edu[0]).topic;
                                item.edu = [...edu]
                                item.edux = [...edu].join("|")

                            }
                        });

                    } else {
                        this.lstProfile = {}
                    }

                }
            } catch (e) {
                console.log(e)
            }
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
                            // this.lstEducation = []
                        }

                    } else {
                        this.lstProfile = {}
                        //this.lstEducation = []
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

                //const dataM = await this.$http.get('api/register/all')
                const dataJ = await this.$http.get('api/jobs/list')

                this.$http.all([dataJ]).then(
                    this.$http.spread((...res) => {
                        //this.lstMebers = res[0].data.data
                        //console.log(this.lstMebers)
                        this.lstJobs = res[0].data.data
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

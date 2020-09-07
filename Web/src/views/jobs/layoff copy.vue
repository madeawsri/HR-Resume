<template lang="dateFormatThai">
<memberLayout>
    <div slot="content">

        <div class="col-lg-12 col-md-12">
            <form @submit.prevent="sendData">
                <div class="dashboard-list-box margin-top-0">
                    <h4>{{headTitle}}

                        <div class="pull-right">
                            <div style="display:flex;height:30px;">
                                <input type="text" v-model="dataForm.keyword" class="form-control input-text" style="margin-right:8px;" />
                                <button type="button" class="button " @click="findMember" style="padding: 0px 20px;"><i class="fa fa-search"></i></button>
                            </div>

                        </div>

                    </h4>

                    <div class="dashboard-list-box-content">

                        <div class="submit-page">

                            <div class="form" style="width:30%">
                                <h5> วันที่เลิกจ้าง </h5>
                                <v-date v-model="dataForm.outdate" class="datetime-picker" value-type="format" format="YYYY-MM-DD" :lang="dateFormatThai" type="date" placeholder="วันที่นัดสัมภาษณ์"></v-date>
                            </div>
                            <div class="form" style="width:20%">
                                <h5> สถานภาพพนักงาน </h5>
                                <v-multiselect placeholder="สถานะพนักงาน " label="topic" track-by="topic" v-model="dataForm.status" :options="$store.state.jobs.status" :multiple="false" :close-on-select="true" :hide-selected="true" :show-labels="false" @select="selectJob"></v-multiselect>
                            </div>

                            <div class="form" style="width:50%">
                                <h5> เหตุผล : {{dataForm.topic}}</h5>
                                <input type="text" v-model="dataForm.statusnote" class="form-control input-text" />
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
                            <th><i class="fa fa-file-text"></i> ตำแหน่งงาน</th>
                            <th><i class="fa fa-file-text"></i> วันที่เลิกจ้าง</th>
                            <th><i class="fa fa-file-text"></i> สถานภาพ</th>
                            <th><i class="fa fa-file-text"></i> เหตุผล</th>
                            <th></th>
                        </tr>

                        <tr style="padding: 5px 5px;" v-for="(item, index) in lstProfile" :key="index">
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{item.idcard}}</td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{ item.namecard}}</td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{item.jobname}} </td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{item.outdate | moment("DD MMMM YYYY") }} </td>
                            <td>{{ $store.state.jobs.status.find(x=>x.id==item.wstatus).topic}}</td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{item.statusnote}} </td>
                            <td style="padding: 5px 5px; ">

                                <!-- <button @click="dialogInfo(item.profileid)" class="button" style="margin-right:5px;"> <i class="ln ln-icon-Big-Data"></i></button>
                                <button @click="dialogInfo(item.profileid)" class="button" style="margin-right:5px;"> {{dataAction}} </button> -->

                                <ul class="checkboxes">
                                    <li>
                                        <input :id="'chk'+index" :value="item.id" v-model="cbAction" type="checkbox" name="check">
                                        <label :for="'chk'+index"> อัพเดชสถานะ </label>
                                    </li>
                                </ul>

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
        //await this.getLstDatas();
        await this.getProfile();

        this.lstProfileCopy = [...this.lstProfile]

        console.log(this.lstProfile)

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
            countJob: 0,
            headTitle: 'เลิกจ้าง / หมดสัญญา / ออกจากงาน / ลาออก',
            editForm: {
                keydb: 0,
                index: 0,
                mode: "save",
                modeTitle: "บันทึกข้อมูล"
            },

            dataAction: "บันทึก",
            cbAction: [],
            dataForm: {
                topic: '',
                job: [],
                member: [],
                keyword: ""

            },
            dataInfo: {
                family: {},
                education: {},
                work: {},
                training: {},
                knowledge: {}
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
        onCheckboxPM: async function (e, data) {

            let dataSave = {
                pmdate: this.dataForm.pmdate,
                id: data
            }
            if (!e.target.checked) {
                dataSave.pmdate = null
            }
            try {
                //await this.sendData(dataSave)
                console.log(dataSave)
                console.log(this.checkPass)
            } catch (err) {
                console.log(err)
            }

        },
        applyJob: async function (idcard) {
            let saveData = {
                idcard: idcard,
                jobid: this.selectJobId,
                regstatus: 1
            }

            this.$http.post(`api/jobinterest/${idcard}/${this.selectJobId}`, saveData).then((data) => {
                let obj = data.data
                if (obj.success) {
                    if (obj.data === undefined) {
                        this.$fire({
                            title: "รับสมัครงาน",
                            text: "ได้มีการรับสมัครงานอยู่แล้ว.",
                            type: "warning",
                            timer: 3000
                        })
                    } else {

                        this.lstProfile = [...this.lstProfile.filter(x => x.profileid !== idcard)]
                        this.countJob++;

                        this.$fire({
                            title: "รับสมัครงาน",
                            text: "เรียบร้อยแล้ว.",
                            type: "success",
                            timer: 3000
                        })
                    }

                } else {
                    this.$fire({
                        title: "รับสมัครงาน",
                        text: "ระบบมีปัญหา กรุณาติดต่อเจ้าหน้าที่.",
                        type: "error",
                        timer: 3000
                    })
                }
                console.log(data.data.data)
            }).catch(e => {
                console.log(e)
                this.$fire({
                    title: "รับสมัครงาน",
                    text: "ระบบมีปัญหา กรุณาติดต่อเจ้าหน้าที่.",
                    type: "error",
                    timer: 3000
                })
            })

            // console.log(saveData)

        },
        async loadDataInfo(idcard) {
            try {

                const family = `api/family/${idcard}`
                const education = `api/education/profile/${idcard}/0`
                const work = `api/work/profile/${idcard}`
                const training = `api/training/profile/${idcard}`
                const knowledge = `api/knowledge/profile/${idcard}`

                const data1 = await this.$http.get(family)
                const data2 = await this.$http.get(education)
                const data3 = await this.$http.get(work)
                const data4 = await this.$http.get(training)
                const data5 = await this.$http.get(knowledge)

                this.$http.all([data1, data2, data3, data4, data5]).then(
                    this.$http.spread((...res) => {

                        this.dataInfo.family = res[0].data.data
                        this.dataInfo.education = res[1].data.data
                        this.dataInfo.work = res[2].data.data
                        this.dataInfo.training = res[3].data.data
                        this.dataInfo.knowledge = (res[4].data.data === null) ? {} : res[4].data.data;

                    }))

            } catch (e) {
                console.log(e)
            }
        },
        dialogInfo: async function (idcard) {
            console.log(this.$refs.info)
            await this.getMemberInfo(idcard);
            await this.loadMyPicture(idcard);
            await this.getWork(idcard)

            /*
             dataInfo: 
                family
                education
                work
                training
                knowledge
            */
            await this.loadDataInfo(idcard);

            console.log(this.dataInfo)

            this.$fire({
                title: '<span style="text-align:left;">รายละเอียดผู้สมัคร</span>',
                html: this.$refs.info,
                width: "90%",
                showCloseButton: false,
                cancelButtonText: 'ยกเลิก',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'รับสมัครงาน',
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

                        if (this.memberInfo.carid) {
                            this.memberInfo.carid = this.$store.state.jobs.ctype.find(x => x.id == this.memberInfo.carid).topic
                            // if (this.memberInfo.carid !== null)
                            //     this.memberInfo.carid = this.memberInfo.carid.topic
                        }

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
            console.log(this.lstProfile)
            console.log(this.lstProfileCopy)
            console.log("key : " + keyword)
            if (keyword !== "")
                this.lstProfile = [...this.lstProfile.filter(x => ((String(x.namecard).includes(keyword) ||
                        String(x.idcard).split(' ').join('').includes(keyword) ||
                        String(x.jobname).includes(keyword)) ||
                    String(x.statusnote).includes(keyword)))]
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
        getJobIn: async function (idcard) {
            try {
                console.log("job id")
                const {
                    data
                } = await this.$http.get(`api/jobinterest/${idcard}`)
                if (data.success == 1) {
                    if (data.data !== null) {

                        //console.log(data.data)
                        this.jobInter = [...data.data].map((it) => it.pname).join(',');
                        this.lstJobs = this.lstJobs.filter(a => data.data.findIndex(b => b.jobid == a.id) < 0);
                        //console.log(this.lstJobs)

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
            await this.getProfile();

            console.log("jobid " + item.id)

            const dataLength0 = this.lstProfile.length
            console.log(this.lstProfile.length)
            this.lstProfile = [...(this.lstProfile.filter(x => !((String(x.jobids) + ",").includes(item.id + ","))))]
            this.countJob = (dataLength0 - this.lstProfile.length)

            //this.lstProfile = [...this.lstProfile.filter(x => x.jobids === null)]
            this.lstProfileCopy = [...this.lstProfile]

        },
        getProfile: async function () {
            try {
                const {
                    data
                } = await this.$http.get(`api/promise`)
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

                            } else {
                                //this.lstEducation = []
                            }
                        });

                        /*

                        */

                    } else {
                        this.lstProfile = {}
                        // this.lstEducation = []
                    }

                    //console.log(this.lstProfile)
                }
                //console.log(data)
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

                const dataM = await this.$http.get('api/register/all')
                const dataJ = await this.$http.get('api/jobs/list')

                this.$http.all([dataM, dataJ]).then(
                    this.$http.spread((...res) => {
                        this.lstMebers = res[0].data.data
                        console.log(this.lstMebers)
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
</style><style scoped>
.text-h {
    margin-bottom: 2px;
    font-size: 14px;
}

.text-topic {
    background: rgba(219, 255, 23, 0.52);
    border-radius: 30px;

    /*background-color: #64bc36;
    border-radius: 50px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
    font-style: normal;
    */
    font-weight: bold;
    padding: 3px 8px;
    margin-left: 3px;
}

table.manage-table tr td {
    padding: 5px 5px;
}
</style>

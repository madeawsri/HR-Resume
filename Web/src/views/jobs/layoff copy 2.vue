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
                                <h5> เหตุผล : </h5>
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

                        <tr style="padding: 2px 2px;" v-for="(item, index) in lstProfile" :key="index">
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{item.idcard}}</td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{ item.namecard}}</td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{item.jobname}} </td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{item.outdate | moment("DD MMMM YYYY") }} </td>
                            <td>{{ $store.state.jobs.status.find(x=>x.id==item.wstatus).topic}}</td>
                            <td style="padding: 5px 5px;font-weight:bold;" class="title"> {{item.statusnote}} </td>
                            <td style="padding: 2px 2px;">
                                <!-- <button @click="dialogInfo(item.profileid)" v-show="isSelectJob" class="button" style="margin-right:5px;"> เลือกผู้ที่ผ่านสัมภาษณ์</button> -->
                                <!-- v-show="dataForm.outdate || item.outdate"-->
                                <ul class="checkboxes">
                                    <li>
                                        <input :id="'chk'+index" v-model="checkPass" type="checkbox" @click="onCheckboxPM($event,item)">
                                        <label :for="'chk'+index"> รับเอกสารทำสัญญา </label>
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
    },
    async created() {
        await this.getLstDatas();
        await this.getProfile();
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
            headTitle: 'เลิกจ้าง / หมดสัญญา / ออกจากงาน / ลาออก',

            dataForm: {

                statusnote: "มาสัมภาษณ์ภายในวันและเวลาทำการ",
                keyword: "",
                outdate: null,
                status: null,
                idcard: null,

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
            }], // data in table,
            selectPass: "ln ln-icon-Yes",
            checkPass: [],

        }
    },
    computed: {

    },
    methods: {
        onCheckboxPM: async function (e, data) {
            /*
            if (!e.target.checked) {
                dataSave.pmdate = null
            }*/
            try {
                //await this.sendData(dataSave)
                //console.log(dataSave)
                console.log(data)
            } catch (err) {
                console.log(err)
            }

        },

        alertLineNotify: async function () {

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
                        title: "รายงานผลสัมภาษณ์",
                        text: "เรียบร้อยแล้ว.",
                        type: "success",
                        timer: 3000
                    })

                } else {
                    this.$fire({
                        title: "รายงานผลสัมภาษณ์",
                        text: "ระบบมีปัญหา กรุณาติดต่อเจ้าหน้าที่.",
                        type: "error",
                        timer: 3000
                    })
                }
                //console.log(obj)
            }).catch(e => {
                console.log(e)
                this.$fire({
                    title: "รายงานผลสัมภาษณ์",
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
                    confirmButtonText: 'รายงานผลสัมภาษณ์',
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
                    title: "รายงานผลสัมภาษณ์",
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

        selectJob: async function (item) {

        },
        getProfile: async function () {

            try {
                const {
                    data
                } = await this.$http.get(`api/promise`)
                console.log(" loading profile ")

                let objCtype = this.$store.state.jobs.ctype
                let levelTopic = this.$store.state.jobs.etype

                if (data.success == 1) {
                    if (data.data !== null) {
                        console.log(data)
                        this.lstProfile = data.data
                    } else {
                        this.lstProfile = {}
                    }

                }
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
        async sendData(dataSave = null) {

            if (dataSave === null)
                dataSave = {
                    pmdate: this.dataForm.pmdate,
                    id: this.checkPass.join(",")
                }

            try {
                const dataJ = await this.$http.patch('/api/jobinterest/contract', dataSave)
                this.$http.all([dataJ]).then(
                    this.$http.spread((...res) => {
                        console.log(res[0])
                    })
                )

                await this.getProfile(this.selectJobId);

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
table.manage-table tr td {
    padding: 5px 5px;
}
</style>

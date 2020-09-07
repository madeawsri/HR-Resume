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
                                <v-multiselect placeholder="สถานะพนักงาน " label="topic" track-by="topic" v-model="dataForm.status" :options="lstStatus" :multiple="false" :close-on-select="true" :hide-selected="true" :show-labels="false"></v-multiselect>
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

                                <ul class="checkboxes">
                                    <li v-show="dataForm.outdate && dataForm.status">
                                        <!--<input :id="'chk'+index" :value="item.id" v-model="checkPass" type="checkbox" name="check" @click="onCheckboxPM($event,item)">
                                        <label :for="'chk'+index"> เลิกจ้าง </label>-->

                                        <div style="display:flex;height:30px;">

                                            <button type="button" class="button " @click="onCheckboxPM(item)" style="padding: 0px 20px;">อัพเดชสถานะ</button>
                                        </div>
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
        //await this.getLstDatas();
        await this.getProfile();
        this.lstProfileCopy = [...this.lstProfile]

        this.lstStatus = (this.lstStatus.filter(x => x.id > 0))

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
            headTitle: 'ยกเลิกสัญญาจ้าง',
            dataForm: {
                statusnote: "",
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
            lstStatus: this.$store.state.jobs.status
        }
    },
    computed: {

    },
    methods: {
        onCheckboxPM: async function (data) {
            let dataSave = {
                outdate: this.dataForm.outdate,
                status: this.dataForm.status.id,
                statusnote: this.dataForm.statusnote,
                idcard: data.idcard

            }

            try {
                /*
                                const {
                                    data
                                } = 
                                console.log(data)
                                if (data.success) {

                                    */
                let updateJson = this.lstProfile.find(x => x.idcard == data.idcard)
                console.log(updateJson)
                updateJson.outdate = dataSave.outdate
                updateJson.statusnote = dataSave.statusnote
                await this.$http.patch('api/promise', dataSave)
                await this.alertSuccess()
                /* } else {
                     this.alertFail()
                 }*/

            } catch (err) {
                console.log(err)
                this.alertFail()
            }

        },

        findMember: function () {
            let keyword = this.dataForm.keyword

            if (keyword !== "")
                this.lstProfile = [...this.lstProfileCopy.filter(x => (
                    String(x.namecard).includes(keyword) ||
                    String(x.profileid).split(' ').join('').includes(keyword) ||
                    String(x.statusnote).includes(keyword) ||
                    String(x.jobname).includes(keyword)))]
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

        getProfile: async function (jobid = null) {
            console.log(jobid)
            try {
                const {
                    data
                } = await this.$http.get(`api/promise`)
                console.log(" loading profile ")
                console.log(data)
                if (data.success == 1) {
                    if (data.data !== null) {
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

        alertSuccess: async function (msg = "บันทึกเรียบร้อยแล้ว") {
            await this.$fire({
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

.dashboard-list-box ul li {
    padding: 0px 0px;

}
</style>

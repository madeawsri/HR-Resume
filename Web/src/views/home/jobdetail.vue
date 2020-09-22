<template>
<homeLayout>
    <div slot="homecontent">

        <!-- Recent Jobs -->
        <div class="eleven columns">
            <div class="padding-right">

                <!-- Company Info -->
                <div class="company-info">
                    <img :src="lineQrcode" alt="" v-if="0">
                    <div class="content">
                        <h4 style="background-color: hsla(14, 100%, 53%, 0.3);border-radius: 5px;"><strong style="margin-left:10px;margin-right:10px;"> {{dataDetail.xtopic}} <span style="color:green;">{{dataDetail.num}}</span>ตำแหน่ง </strong> </h4>
                        <span v-if="0"><a href="#"><i class="fa fa-link"></i> Website</a></span>
                        <span v-if="0"><a href="#"><i class="fa fa-twitter"></i> @admin</a></span>
                        <span style="" v-if="0"><i class="ln ln-icon-Affiliate"></i> {{$vStrToJson(dataDetail.stype).topic}}</span>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <p class="margin-reset" v-if="0">
                    The Food Service Specialist ensures outstanding customer service is provided to food customers and that all food offerings meet the required stock levels and presentation standards. Beginning your career as a Food Steward will give you a strong foundation in Speedway’s food segment that can make you a vital member of the front line team!
                </p>

                <p class="margin-bottom-0"><strong>คุณสมบัติผู้สมัคร</strong> </p>
                <ul class="list-1" v-for="(item, index) in $vStrToJson(dataDetail.qualifys)" :key="'a'+index">
                    <li>{{item.topic}}</li>
                </ul>

                <p class="margin-bottom-0"><strong>หลักฐานการสมัคร</strong> </p>
                <ul class="list-1" v-for="(item,index) in $vStrToJson(dataDetail.proofs)" :key="'b'+index">
                    <li>{{item.topic}}</li>
                </ul>

                <p class="margin-bottom-0"><strong>สวัสดิการและผลประโยชน์ตอบแทน</strong> </p>
                <ul class="list-1" v-for="(item,index) in $vStrToJson(dataDetail.benefits)" :key="'c'+index">
                    <li>{{item.topic}}</li>
                </ul>

                <!-- Company Info -->
                <div class="company-info">
                    <div class="content">
                        <h4 style="background:hsla(147, 100%, 50%, 0.3);;border-radius: 5px;">
                            <strong style="margin-left:10px;margin-right:10px;">รายชื่อนัดสัมภาษณ์</strong>
                        </h4>
                        <span v-if="0"><a href="#"><i class="fa fa-link"></i> Website</a></span>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <p class="margin-reset" v-if="0">
                    ให้ผู้สมัครมาสอบสัมภาษณ์ในเวลาทำการเท่านั้น
                </p>
                <div v-for="(item, index) in groupDateInterviews" :key="'i'+index">

                    <p class="margin-bottom-0"><strong>วันที่ {{index|moment('DD MMMM YYYY')}}</strong> </p>

                    <ul class="list-1" v-for="(itemx, index) in item " :key="'ai'+index">
                        <li>{{itemx.fname}} <i class="fa fa-align-left"></i> <small>{{itemx.nudnote}}</small></li>
                    </ul>

                </div>

                <!-- Company Info -->
                <div class="company-info">
                    <div class="content">
                        <h4 style="background:hsla(50, 100%, 50%, 0.3);;border-radius: 5px;">
                            <strong style="margin-left:10px;margin-right:10px;">รายชื่อที่ผ่านสัมภาษณ์</strong>
                        </h4>
                        <span v-if="0"><a href="#"><i class="fa fa-link"></i> Website</a></span>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <p class="margin-reset" v-if="0">
                    ให้ผู้สมัครที่ผ่านสัมภาษณ์มาทำสัญญาจ้างในวันที่กำหนดให้
                </p>

                <div v-for="(item, index) in groupDatePromise" :key="'ii'+index">
                    <div v-show="index != 'null'">
                        <p class="margin-bottom-0"><strong>วันที่ {{index|moment('DD MMMM YYYY')}}</strong> </p>
                        <ul class="list-1" v-for="(itemx, index) in item " :key="'aii'+index">
                            <li>{{itemx.fname}} </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

        <!-- Widgets -->
        <div class="five columns">

            <!-- Sort by position: fixed; top: 50%; left: 50%;  transform: translate(-50%, -50%);-->
            <div class="widget">

                <div class="job-overview">
                    <div style="text-align:center;" v-if="0">
                        <img :src="lineQrcode" alt="" v-if="1" align="center">
                    </div>

                    <ul>
                        <li>
                            <i class="fa fa-map-marker"></i>
                            <div>
                                <strong>กรอกใบสมัครด้วยตนเองได้</strong>
                                <span>ชั้น 1: แผนกบุคคล โทร.043-432-902-6 ต่อ 7053</span>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-user"></i>
                            <div>
                                <strong>ลักษณะงาน:</strong>
                                <span>{{$vStrToJson(dataDetail.ptype).topic}}</span>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-clock-o"></i>
                            <div>
                                <strong>ระยะเวลาเปิดรับสมัคร:</strong>
                                <span> {{dataDetail.datein | moment("DD MMM YYYY ")}} ถึง {{dataDetail.dateout|moment("DD MMM YYYY")}} </span>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-money"></i>
                            <div>
                                <strong>อัตราค่าจ้าง:</strong>
                                <span>ขึ้นอยู่กับโครงสร้างของบริษัท</span>
                            </div>
                        </li>
                    </ul>

                    <div v-if="!isWebAdmin">

                        <div v-show="lstRegister.wstatus != 1">
                            <div v-if="dataDetail.ostatus">
                                <button @click="sentData" class="popup-with-zoom-anim button" v-show="isLogged && !isApplyJod"> ส่งใบสมัครงาน </button>
                                <button class=" button disabled" v-show="isApplyJod"> <i class="ln ln-icon-Mail-Send"></i> ส่งใบสมัครงานเรียบร้อยแล้ว. </button>
                                <router-link class="button" to="login" v-show="this.idcard==null"> ส่งใบสมัครงาน </router-link>
                            </div>
                            <div v-if="!dataDetail.ostatus" align="center">
                                <h4 style="background: rgba(219, 255, 23,0.52); border-radius: 5px;">
                                    <strong style="margin-left: 10px; margin-right: 10px;color:red;">ปิดรับสมัครงาน</strong>
                                </h4>

                            </div>
                        </div>
                    </div>

                </div>
                <!--
                <div class="dashboard-list-box margin-top-5" v-if="0">
                    <h4 style="padding: 5px 10px;"> ตำแหน่งงานอื่นๆ </h4>
                    <ul v-for="(item,index) in $vStrToJson(dataDetail.proofs)" :key="'b'+index">
                        <li style="padding: 5px 10px;"><i class="ln ln-icon-Check"></i> <a>เจ้าหน้าที่จัดสวน / 10 ตำแหน่ง </a></li>
                    </ul>
                </div> -->

            </div>

        </div>
        <!-- Widgets / End -->

    </div>
</homeLayout>
</template>

<script>
import homeLayout from '../../components/layouts/index'

export default {
    computed: {
        isWebAdmin() {
            return this.$store.getters['user/isWebAdmin']
        },
        isLogged() {
            return this.$store.getters['user/isLogged']
        },
        getIDCard() {
            return this.$vStrToJson(this.$store.state.user.data) ? this.$vStrToJson(this.$store.state.user.data).idcard : null;
        },
        groupDateInterviews() {
            const groupBy = (array, key) => {
                return array.reduce((result, currentValue) => {
                    (result[currentValue[key]] = result[currentValue[key]] || []).push(
                        currentValue
                    );
                    return result;
                }, {});
            };
            return groupBy(this.lstInterviews, "nuddate");
        },
        groupDatePromise() {
            const groupBy = (array, key) => {
                return array.reduce((result, currentValue) => {
                    (result[currentValue[key]] = result[currentValue[key]] || []).push(
                        currentValue
                    );
                    return result;
                }, {});
            };
            return groupBy(this.lstInterviews, "pmdate");
        }
    },
    async mounted() {
        this.idcard = this.getIDCard
        this.isSent();
        await this.getInterviews();
        await this.getPromises();

    },
    async created() {

        if (this.jobid === undefined) {
            this.alertFail();
        } else {
            await this.showDetail();
            await this.getRegister();
        }

    },
    data() {
        return {
            jobid: this.$route.params.jobid,
            dataDetail: [],
            isApplyJod: false,
            idcard: this.getIDCard,
            lstInterviews: [],
            lstPromises: [],
            lstRegister: {},
            lineQrcode: 'images/line-hr.jpg'
        }
    },
    components: {
        homeLayout,

    },
    methods: {
        async getInterviews() {
            try {
                const {
                    data
                } = await this.$http.get(`/api/jobinterest/interview/${this.jobid}`)
                if (data.success) {
                    this.lstInterviews = [...data.data]
                }
            } catch (e) {
                console.log(e)
            }
        },
        async getRegister() {
            try {
                const {
                    data
                } = await this.$http.get(`/api/register/id/${this.getIDCard}`)

                if (data.success) {
                    this.lstRegister = {
                        ...data.data
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        async getPromises() {
            try {
                const {
                    data
                } = await this.$http.get(`/api/promise/${this.jobid}`)
                if (data.success) {
                    this.lstPromises = [...data.data]
                }
            } catch (e) {
                console.log(e)
            }
        },
        async isSent() {
            console.log(this.idcard + "," + this.jobid)
            try {

                if (this.idcard != null) {

                    const {
                        data
                    } = await this.$http.get(`/api/jobinterest/${this.idcard}/${this.jobid}`)
                    console.log("isSent")
                    console.log(data)
                    this.isApplyJod = (data.success && data.data)

                } else {
                    this.isApplyJod = false
                }

                //  
            } catch (e) {
                console.log(e)
            }

        },
        sentData: async function () {

            try {
                const {
                    data
                } = await this.$http.post(`/api/jobinterest/${this.idcard}/${this.jobid}`)
                console.log(data)
                if (data.success) {
                    this.isApplyJod = true;
                    this.alertAccess();
                }
                //  
            } catch (e) {
                console.log(e)
            }

        },
        alertAccess: function () {
            this.$fire({
                title: "ส่งใบสมัครงาน",
                text: "เรียบร้อยแล้ว.",
                type: "success",
                //timer: 3000
            }).then((ok) => {
                if (ok) {
                    this.$fire({
                        imageUrl: `${this.lineQrcode}`,
                        footer: '<a href>ติดตามผลการสมัครงานได้ที่ Line Official Account</a>',
                        confirmButtonText: "รับทราบ",
                        timer: 60000
                    }).then((ook) => {
                        if (ook)
                            window.location.href = '/home';
                    })
                }

            })
        },
        alertFail: function () {
            this.$fire({
                title: "รายละเอียดงาน",
                text: 'ไม่สามารถเข้าดูได้',
                type: "warning",
                timer: 3000
            }).then(() => {
                this.$vLink('home')
            })
        },
        async showDetail() {
            try {
                const {
                    data
                } = await this.$http.get(`/api/jobs/${this.jobid}`)

                if (data.success == 1) {

                    const xdata = data.data
                    this.dataDetail = {
                        ...xdata
                    }
                    console.log(this.dataDetail)
                    /*
                    if (data.data) {
                        console.log(data.data)
                        this.dataDetail.push(...data.data)
                        console.log(this.dataDetail)
                    } else return*/

                } else {
                    this.alertFail()
                }

            } catch (e) {
                console.log(e)

            }

        },
    },
}
</script>

<style>
.company-info {
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 5px;
    margin-bottom: 0px;
}
</style><style lang="postcss" scoped>
.disabled {
    cursor: not-allowed;
    color: gray;
    background-color: lightgrey;
}
</style>

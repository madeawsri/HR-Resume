<template>
<div class="five columns">

    <h3 class="margin-bottom-5">งานด่วน</h3>

    <!-- Navigation -->
    <div class="showbiz-navigation">
        <div id="showbiz_left_1" class="sb-navigation-left">
            <i class="fa fa-angle-left"></i>
        </div>
        <div id="showbiz_right_1" class="sb-navigation-right">
            <i class="fa fa-angle-right"></i>
        </div>
    </div>
    <div class="clearfix"></div>

    <!-- Showbiz Container -->
    <div id="job-spotlight" class="showbiz-container">
        <div class="showbiz" data-left="#showbiz_left_1" data-right="#showbiz_right_1" data-play="#showbiz_play_1">
            <div class="overflowholder">
                <ul>
                    <li v-for="(item, index) in listDatas" :key="index">
                        <div class="job-spotlight">
                            <router-link :to="{ name: 'Jobdetail', params: { jobid: item.id }}">
                                <h4>
                                    {{item.topic}}
                                    <span :class="getPtypeClass(item.ptype)">{{$store.getters.strtojson(item.ptype,'topic')}}</span>
                                </h4>
                            </router-link>
                            <span><i class="fa fa-briefcase"></i> ต้องการ {{item.num}} ตำแหน่ง</span>
                            <span><i class="ln ln-icon-Timer-2"></i> รับสมัคร {{item.datein | moment("DD MMM YYYY ")}} ถึง {{item.dateout|moment("DD MMM YYYY")}}</span>
                            <p>

                            </p>
                            <router-link :to="{ name: 'Jobdetail', params: { jobid: item.id }}" class="button"> รายละเอียด </router-link>
                        </div>
                    </li>

                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
</template>

<script>
//import {showbizpro} from '../../../../../public/scripts/jquery.themepunch.showbizpro.min'
export default {
    data() {
        return {
            page: 0,
            listDatas: [],
            //is_script_loading: false
        }
    },
    async created() {
        await this.showDataAll();

    },
    methods: {
        getPtypeClass: function (value) {
            let obj = this.$store.getters.strtojson(value, 'id')
            return this.$store.getters.getptype(obj).class
        },
        showMoreData: async function () {
            console.log('click show more data!!!')
            this.page++
            await this.showDataAll()
        },
        async showDataAll() {
            try {
                const {
                    data
                } = await this.$http.get(`/api/jobs/`)
                console.log("งานด่วน")
                let datax = data.data
                console.log(datax)
                datax = datax.filter(x => this.$store.getters.strtojson(x.stype, 'id') === 1)
                console.log(datax)

                if (data.success == 1) {
                    if (data.data) {
                        this.listDatas.push(...datax)
                    } else return

                } else {
                    this.alertFail()
                }

            } catch (e) {
                console.log(e)

            }

        },
    },

    async mounted() {
        console.log("job list")
        //   this.$nextTick(async () => {
        /*
                    try {
                        await this.load_script();
                            const $ = require('jquery')
                            window.$ = $;
                            $('#job-spotlight').showbizpro({
                                dragAndScroll: "off",
                                visibleElementsArray: [1, 1, 1, 1],
                                carousel: "off",
                                entrySizeOffset: 0,
                                allEntryAtOnce: "off",
                                rewindFromEnd: "off",
                                autoPlay: "off",
                                delay: 2000,
                                speed: 400,
                                easing: 'easeOut'
                            });
                        // .. do what you want after script has loaded
                    } catch (err) {
                        console.log("Error")
                        console.log(err)
                    }
                    */

        //      const $ = require('jquery')
        //     window.$ = $;
        /*
                       Promise.all([
                            this.$loadScript("http://10.7.10.26:8082/scripts/jquery.themepunch.tools.min.js"),
                            this.$loadScript("http://10.7.10.26:8082/scripts/jquery.themepunch.revolution.min.js"),
                            this.$loadScript("http://10.7.10.26:8082/scripts/jquery.themepunch.showbizpro.min.js")
                        ]).then( async () => {
 $('#job-spotlight').showbizpro({
            dragAndScroll: "off",
            visibleElementsArray: [1, 1, 1, 1],
            carousel: "off",
            entrySizeOffset: 0,
            allEntryAtOnce: "off",
            rewindFromEnd: "off",
            autoPlay: "off",
            delay: 2000,
            speed: 400,
            easing: 'easeOut'
        });
                        })
                        */

        // })
    },
}
</script>

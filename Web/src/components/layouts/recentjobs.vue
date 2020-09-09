<template>
<div class="eleven columns">
    <div class="padding-right">
        <h3 class="margin-bottom-25">งานล่าสุด</h3>
        <div class="listings-container">
            <div v-for="(item, index) in listDatas" :key="index">

                <!--  <a href=""  > -->
                <router-link class="listing " :class="getPtypeClass(item.ptype)" :to="{ name: 'Jobdetail', params: { jobid: item.id }}">
                    <div class="listing-title">
                        <h4>
                            {{item.topic}} / {{item.num}} ตำแหน่ง
                            <span class="listing-type ">{{$store.getters.strtojson(item.ptype,'topic')}}</span>
                        </h4>
                        <ul class="listing-icons">
                            <li><i class="ln ln-icon-Timer-2"></i> รับสมัคร {{item.datein | moment("DD MMM YYYY ")}} ถึง {{item.dateout|moment("DD MMM YYYY")}}</li>
                            <li v-if="0">
                                <i class="ln ln-icon-Map2"></i> 7th Avenue, New York, NY,
                                United States
                            </li>
                            <li><i class="ln ln-icon-Money-2"></i> ตามโครงสร้างของษริษัท</li>
                            <li v-if="0">
                                <div class="listing-date">3d ago</div>
                                <div class="listing-date new">new</div>
                            </li>
                        </ul>
                    </div>
                </router-link>

            </div>

        </div>

        <button class="button centered" @click="showMoreData"><i class="fa fa-plus-circle"></i> แสดงงานเพิ่มเติม</button>
        <div class="margin-bottom-55"></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            page: 0,
            listDatas: []
        }
    },
    created() {
        this.showDataAll();

    },
    methods: {

        getPtypeClass: function (value) {
            let obj = this.$store.getters.strtojson(value, 'id')
            return this.$store.getters.getptype(obj).class
        },
        showMoreData: async function () {
            console.log('click show more data!!!')
            this.page++
            await this.showDataAll(this.page)
        },
        async showDataAll(page = 0) {
            try {
                const {
                    data
                } = await this.$http.get(`/api/jobs/page/${page}`)

                if (data.success == 1) {

                    if (data.data) {

                        //  console.log([...data.data])
                        //  console.log('++++++++++++++++++++++++')
                        this.listDatas.push(...data.data)
                    } else return

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
.search-container {
    display: block;
    width: 100%;
    position: relative;
    padding: 50px 0;
    margin-top: -10px;
}

#banner.with-transparent-header .search-container {
    padding: 45px 0;
    margin-top: 0px;
}
</style>

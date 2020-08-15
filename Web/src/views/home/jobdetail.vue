<template>
<homeLayout>
    <div slot="homecontent">

        job detail {{jobid}}
        <br>
        {{dataDetail}}
    </div>
</homeLayout>
</template>

<script>
import homeLayout from '../../components/layouts/index'

export default {

    async created() {
        if (this.jobid === undefined) {
            this.alertFail();
        } else {
            await this.showDetail();
        }
    },
    data() {
        return {
            jobid: this.$route.params.jobid,
            dataDetail: []
        }
    },
    components: {
        homeLayout,

    },
    methods: {
        alertFail: function () {
            this.$fire({
                title: "รายละเอียดงาน",
                text: 'ไม่สามารถเข้าดูได้',
                type: "warning",
                timer: 3000
            }).then(() => {
                //this.$router.push('/home')
                this.$router.push({
                    name: 'Home',
                    force: true,
                    refresh: true
                });
            })
        },
        async showDetail() {
            try {
                const {
                    data
                } = await this.$http.get(`/api/jobs/${this.jobid}`)

                if (data.success == 1) {
                    
                    const xdata = data.data
                    this.dataDetail = {...xdata}
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

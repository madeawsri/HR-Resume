<template>
<div>
    <memberLayout>
       <div slot="homecontent">
            <recentjobsLayout />
            <jobspotlightLayout />
        </div>
    </memberLayout>
</div>
</template>

<script>
import memberLayout from '@/components/layouts/index'
import recentjobsLayout from '@/components/layouts/recentjobs.vue';
import jobspotlightLayout from '@/components/layouts/jobspotlight.vue'
export default {
    components: {
        memberLayout,
        recentjobsLayout,
        jobspotlightLayout,
    }
}
</script>

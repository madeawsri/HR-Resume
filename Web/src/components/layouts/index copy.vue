<template>
<div>
    <slot name="homecontent">
       <recentjobsLayout />
       <jobspotlightLayout />
    </slot>
</div>
</template>

<script>

import recentjobsLayout from '@/components/layouts/recentjobs.vue';
import jobspotlightLayout from '@/components/layouts/jobspotlight.vue'

export default {
    components: {
        recentjobsLayout,
        jobspotlightLayout
    },
	computed:{
        /*
		isLogged (){
			return this.$store.getters.isLogged
		}
        */
	}
    
}
</script>
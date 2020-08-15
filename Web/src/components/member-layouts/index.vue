<template>

<div id="wrapper">



<!-- Header
================================================== -->
<headerLayout/>


<!-- Titlebar
================================================== -->

<!-- Dashboard -->
<div id="dashboard">

	<!-- Navigation
	================================================== -->
    <navLayout />

	<!-- Content
	================================================== -->
	<div class="dashboard-content">
	<slot name="content"></slot>

	</div>
	<!-- Content / End -->


</div>
<!-- Dashboard / End -->


</div>



</template>

<script>
import headerLayout from '@/components/member-layouts/header.vue'
import navLayout from '@/components/member-layouts/nav.vue'

export default {
    components: {
        headerLayout,
        navLayout,
       // contentLayout
    },
	computed:{
		isLogged (){
			return this.$store.getters.isLogged
		}
	}
    
}
</script>


<style scoped>
#titlebar {
    background-color: #FFF;
}
</style>
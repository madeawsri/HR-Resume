<template>
<div id="wrapper">

    <!-- Header
================================================== -->
    <headerLayout />
    <!-- Titlebar
================================================== -->

    <!-- Dashboard -->
    <div id="">

        <!-- Navigation

================================================== -->

        <!-- Responsive Navigation Trigger -->
       <navLayout />
        <!-- Navigation / End -->

        <!-- Content

================================================== -->

      <slot name="content"></slot>

    </div>
    <!-- Dashboard / End -->

</div>
<!-- Wrapper / End -->
</template>

<script>
import headerLayout from '@/components/member-layouts/header.vue'
import navLayout from '@/components/member-layouts/nav.vue'
//import contentLayout from '@/components/member-layouts/content.vue'

export default {
    components: {
        headerLayout,
        navLayout,
       // contentLayout
    },
    
}
</script>


<style scoped>
#titlebar {
    background-color: #FFF;
}
</style>
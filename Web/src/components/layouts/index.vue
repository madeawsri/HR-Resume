<template>
<div id="wrapper">
    <!-- Header
================================================== -->
    <headerLayout />
    <!-- Banner
================================================== -->
    <findLayout />

    <!-- Content
================================================== -->

    <!-- Categories -->
    <catagoryLayout v-if="0" />

    <div class="container">
        <slot name="homecontent"></slot>
    </div>

    <!-- Flip banner -->
    <!-- Flip banner / End -->
    <!-- Recent Posts -->

    <!-- Footer
================================================== -->
    <div class="margin-top-15"></div>

    <footerLayout />

    <!-- Back To Top Button -->
    <div id="backtotop">
        <a href="#"></a>
    </div>
</div>
</template>

<script>
 import headerLayout from '@/components/layouts/header.vue';
 import findLayout from '@/components/layouts/find.vue';
 import catagoryLayout from '@/components/layouts/catagory.vue';
 import footerLayout from '@/components/layouts/footer.vue'
 
 export default {
     name: 'Home',
     components: {
         headerLayout,
         findLayout,
         catagoryLayout,
         
         footerLayout
     },
 };
</script>

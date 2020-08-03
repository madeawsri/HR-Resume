<template>
  <div>
    <header class="transparent sticky-header">
      <div class="container">
        <div class="sixteen columns">
          <!-- Logo -->
         <logoLayout />

          <!-- Menu -->
          <menuHeaderLayout />

          <!-- Navigation -->
          <div id="mobile-navigation">
            <a href="#menu" class="menu-trigger"
              ><i class="fa fa-reorder"></i
            ></a>
          </div>
          
        </div>
      </div>
    </header>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import menuHeaderLayout from '@/components/layouts/headers/menu.vue'
import logoLayout from '@/components/layouts/headers/logo.vue'
export default {
  components:{
    menuHeaderLayout,
    logoLayout
  }
}
</script>
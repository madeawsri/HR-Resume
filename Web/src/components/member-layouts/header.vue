<template>
<div>
    <header class="dashboard-header">
        <div class="container">
            <div class="sixteen columns">
                <!-- Logo -->
                <logoLayout />
                <!-- Menu -->
                <menuLayout />
                <!-- Navigation -->
                <div id="mobile-navigation">
                    <a href="#menu" class="menu-trigger"><i class="fa fa-reorder"></i></a>
                </div>

            </div>
        </div>
    </header>
    <div class="clearfix"></div>
</div>
</template>

<script>
import logoLayout from '@/components/member-layouts/logo.vue'
import menuLayout from '@/components/member-layouts/menu.vue'

export default {
    components: {
        logoLayout,
        menuLayout
    }
}
</script>

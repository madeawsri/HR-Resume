<template lang="">
<div>
    <div class="dashboard-content">

        <!-- Titlebar -->
        <div id="titlebar">
            <div class="row">
                <div class="col-md-12">
                    <h2><slot name="title"></slot></h2>
                    <!-- Breadcrumbs -->
                    <nav id="breadcrumbs">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li>Dashboard</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <!-- Content -->

        <div class="row" > {{navmenus}}
          <slot name="content"></slot>

            <!-- Recent Activity -->

            <!-- Recent Activity -->

            
            <!-- Copyrights -->
           
        </div>

    </div>
</div>
</template>

<script>
export default {
    props:{
        navmenus : null
    }
}
</script>

<style scoped>

</style>

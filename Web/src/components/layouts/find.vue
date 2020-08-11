<template>
<div id="banner" class="with-transparent-header parallax background" style="background-image: url(images/0.jpeg)" data-img-width="2000" data-img-height="1330" data-diff="300">
    <div class="container">
        <div class="sixteen columns">
            <div class="search-container">
                <div v-if="0">
                    <!-- Form -->
                    <h2>ค้นหาตำแหน่งว่าง</h2>
                    <input type="text" class="ico-01" placeholder="ช่างไฟฟ้า หรือ คนขับรถ" value="" />
                    <input type="text" class="ico-02" placeholder="ค้นหาตามแผนก" value="" />
                    <button><i class="fa fa-search"></i></button>

                    <!-- Browse Jobs -->
                    <div class="browse-jobs" v-show=0>
                        Browse job offers by
                        <a href="browse-categories.html"> category</a> or
                        <a href="#">location</a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

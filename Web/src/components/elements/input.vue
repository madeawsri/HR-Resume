<template>
<div>
    <label>{{title}}</label>
    <input type="number" v-model="profileData.weight" :name="name">
</div>
</template>

<script>
export default {
    props:{
        title:String,
        name:String
    }
}
</script>

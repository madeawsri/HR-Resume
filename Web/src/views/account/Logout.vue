<template>
<div></div>
</template>

<script>
export default {
  async created(){
       await this.$store.dispatch('user/destroyToken').then(()=>{
            //this.$router.push('/home')
            window.location.href = '/home';
       })
   }
}
</script>


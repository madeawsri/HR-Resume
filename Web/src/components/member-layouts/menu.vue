<template>
<nav id="navigation" class="menu">
    <ul id="responsive" v-show="0">

         <li><a href="#" id="current">บัญชีผู้ใช้</a>
            <ul>
                 <li><a href="/profile">ข้อมูลส่วนตัว</a></li>
                    <li><a href="/family">ข้อมูลครอบครัว</a></li>
                    <li><a href="/education">ข้อมูลการศึกษา</a></li>
                    <li><a href="/work">ข้อมูลการทำงาน</a></li>
                    <li><a href="/training">ข้อมูลการฝึกอบรม</a></li>
                    <li><a href="/knowledge">ข้อมูลความสามารถพิเศษ</a></li>
            </ul>
        </li>

      
    </ul>

    <ul class="responsive float-right">
      
       <li><a href="/dashboard"><i class="fa fa-cog"></i> Dashboard</a></li>
        <li><a href="/message"><i class="fa fa-envelope"></i> ข้อความ <span class="nav-tag text-red"> 0 </span> </a>                </li>
      
     
       
        <li><a href="/logout"><i class="fa fa-lock"></i> ออกจากระบบ</a></li>
    </ul>

</nav>
</template>

<script>
export default {
    
}
</script>


<style scoped>
  .text-red {
      color:red
  }
</style>
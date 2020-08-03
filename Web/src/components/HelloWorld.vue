<template>
  <div>
    <h1>My_Var1 = {{ my_var1 }}</h1>
    <h1>My_Var2 = {{ my_var2 }}</h1>
  </div>
</template>

<script>
import Config from '../config';

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      my_var1: Config.VUE_APP_MY_VAR1,
      my_var2: Config.VUE_APP_MY_VAR2,
    };
  },
};
</script>

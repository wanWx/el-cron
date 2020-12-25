<template>
  <div class="hello">
    <h2>{{msg}}</h2>
    <el-cron style="width: 700px;" v-model="formData.cronValue2" :exeStartTime="exeStartTime"></el-cron>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  },
  data() {
    return {
      msg: 'Cron表达式测试页面',
      formData: {
        cronValue2: '4 1/2 5 7-8 1 ?'
      },
      exeStartTime: '2020-12-25 12:23:10'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

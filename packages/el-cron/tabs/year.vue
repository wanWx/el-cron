<template>
  <div class="config-list">
    <el-radio-group v-model="type">
      <div class="item">
        <el-radio label="TYPE_EVERY" class="choice" :disabled="disabled">每年</el-radio>
      </div>
      <div class="item">
        <el-radio label="TYPE_RANGE" class="choice" :disabled="disabled">区间</el-radio>
        从<el-input-number :disabled="type!=TYPE_RANGE || disabled" :min="0" :precision="0"
        class="w85" v-model="valueRange.start" controls-position="right" size="mini"></el-input-number>年
        至<el-input-number :disabled="type!=TYPE_RANGE || disabled" :min="1" :precision="0"
        class="w85" v-model="valueRange.end" controls-position="right" size="mini"></el-input-number>年
      </div>
      <div class="item">
        <el-radio label="TYPE_LOOP" class="choice" :disabled="disabled">循环</el-radio>
        从<el-input-number :disabled="type!=TYPE_LOOP || disabled" :min="0" :precision="0"
        class="w85" v-model="valueLoop.start" controls-position="right" size="mini"></el-input-number>年开始，间隔
        <el-input-number :disabled="type!=TYPE_LOOP || disabled" :min="1" :precision="0"
        class="w85" v-model="valueLoop.interval" controls-position="right" size="mini"></el-input-number>年
      </div>
    </el-radio-group>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'year',
  mixins: [mixin],
  data () {
    return {}
  },
  watch: {
    value_c (newVal) {
      // console.info('change:' + newVal)
      this.$emit('change', newVal)
    }
  },
  created () {
    const nowYear = (new Date()).getFullYear()
    this.DEFAULT_VALUE = '*'
    this.minValue = 0
    this.maxValue = 0
    this.valueRange.start = nowYear
    this.valueRange.end = nowYear + 100
    this.valueLoop.start = nowYear
    this.valueLoop.interval = 1
    // console.info('created')
    this.parseProp(this.prop)
  }
}
</script>

<style scoped>
.config-list {
  text-align: left;
  margin: 0 10px 10px 10px;
}

.item {
  margin-top: 5px;
  font-size: 12px;
}

.item .el-radio {
  margin-right: 0px;
}

.choice {
  border: 1px solid transparent;
  padding: 5px 8px;
}

.choice:hover {
  border: 1px solid #2d8cf0;
}

.w85 {
  width: 85px;
}

.el-input-number {
  margin-left: 5px;
  margin-right: 5px;
}

.item /deep/ .el-input-number.is-controls-right .el-input__inner {
  padding-right: 35px;
}

.list {
  margin: 0 20px;
}

.list-check-item {
  padding: 1px 3px;
  width: 1em;
}
</style>
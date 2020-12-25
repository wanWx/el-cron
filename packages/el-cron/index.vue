<template>
  <el-card class="el-cron">
    <div class="content">
      <div class="left">
        <el-tabs size="small" v-model="curtab">
          <el-tab-pane label="秒" name="second">
            <cron-second v-model="second" :disabled="disabled"></cron-second>
          </el-tab-pane>
          <el-tab-pane label="分" name="minute">
            <cron-minute v-model="minute" :disabled="disabled"></cron-minute>
          </el-tab-pane>
          <el-tab-pane label="时" name="hour">
            <cron-hour v-model="hour" :disabled="disabled"></cron-hour>
          </el-tab-pane>
          <el-tab-pane label="日" name="day">
            <cron-day v-model="day" :disabled="disabled"></cron-day>
          </el-tab-pane>
          <el-tab-pane label="月" name="month">
            <cron-month v-model="month" :disabled="disabled"></cron-month>
          </el-tab-pane>
          <el-tab-pane label="周" name="week">
            <cron-week v-model="week" :day="day" :disabled="disabled"></cron-week>
          </el-tab-pane>
          <el-tab-pane label="年" name="year" v-if="!hideYear && !hideSecond">
            <cron-year v-model="year" :disabled="disabled"></cron-year>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <div class="field-list">
          <el-table :data="tableData" :show-header="false" size="small">
            <template  v-for="(item, index) in columns" >
              <el-table-column 
                :key="index"
                :prop="item.key"
                :label="item.title">
              </el-table-column>
            </template>
          </el-table>
        </div>
        <div class="exe-pre">
          <div class="exe-pre-panel">
            <label class="p-left">执行时间</label>
            <el-date-picker type="datetime" v-model="startTime" class="p-right"
              placeholder="选择执行开始时间"></el-date-picker>
          </div>
          <div class="exe-pre-panel">
            <el-tooltip content="执行预览解析不含年参数" class="p-left">
              <label>执行预览</label>
            </el-tooltip>
            <el-input type="textarea" :value="preTimeList" class="p-right" :rows="4" readonly></el-input>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { debounce } from 'debounce'
import CronParser from 'cron-parser'
import dateFormat from './format-date'
import cronSecond from './tabs/second.vue';
import cronMinute from './tabs/minute';
import cronHour from './tabs/hour';
import cronDay from './tabs/day';
import cronMonth from './tabs/month';
import cronWeek from './tabs/week';
import cronYear from './tabs/year';

export default {
  name: 'el-cron',
  model: {
    prop: 'cronValue',
    event: 'change'
  },
  props: {
    cronValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    exeStartTime: {
      type: [Number, String, Object],
      default: 0
    },
    hideSecond: {
      type: Boolean,
      default: false
    },
    hideYear: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Function,
      default: null
    }
  },
  components: {
    cronSecond,
    cronMinute,
    cronHour,
    cronDay,
    cronMonth,
    cronWeek,
    cronYear
  },
  watch: {
    cronValue (newVal) {
      if (newVal === this.cronValue_c) {
        return
      }
      this.formatValue()
    },
    cronValue_c (newVal) {
      this.calTriggerList()
      this.$emit('change', newVal)
    },
    exeStartTime () {
      this.calStartTime()
    },
    startTime () {
      this.calTriggerList()
    }
  },
  computed: {
    tableData () {
      let c = this.hideSecond ? [] : [{ name: '秒', value: this.second }]
      c = c.concat([
        { name: '分', value: this.minute },
        { name: '时', value: this.hour },
        { name: '日', value: this.day },
        { name: '月', value: this.month },
        { name: '周', value: this.week }
      ])
      return (this.hideSecond || this.hideYear) ? c.concat({ name: '表达式', value: this.cronValue_c })
        : c.concat(
          { name: '年', value: this.year },
          { name: '表达式', value: this.cronValue_c },
          { name: '表达式(不含年)', value: this.cronValue_c2 }
        )
    },
    cronValue_c () {
      let result = []
      if (!this.hideSecond) result.push(this.second ? this.second : '*')
      result.push(this.minute ? this.minute : '*')
      result.push(this.hour ? this.hour : '*')
      result.push(this.day ? this.day : '*')
      result.push(this.month ? this.month : '*')
      result.push(this.week ? this.week : '?')
      if (!this.hideYear && !this.hideSecond) result.push(this.year ? this.year : '*')
      return result.join(' ')
    },
    cronValue_c2 () {
      const v = this.cronValue_c
      if (this.hideYear || this.hideSecond) return v
      const vs = v.split(' ')
      return vs.slice(0, vs.length - 1).join(' ')
    }
  },
  data() {
    return {
      curtab: this.hideSecond ? 'minute' : 'second',
      second: '*',
      minute: '*',
      hour: '*',
      day: '*',
      month: '*',
      week: '?',
      year: '*',
      startTime: new Date(),
      preTimeList: '执行预览，会忽略年份参数',
      columns: [{ title: ' ', width: '80', key: 'name' }, { title: ' ', key: 'value' }]
    }
  },
  created() {
    this.formatValue()
    this.calStartTime()
    this.$nextTick(() => {
      this.calTriggerListInner()
    })
  },
  methods: {
    formatValue () {
      if (!this.cronValue) return
      const values = this.cronValue.split(' ').filter(item => !!item)
      if (!values || values.length <= 0) return
      let i = 0
      if (!this.hideSecond) this.second = values[i++]
      if (values.length > i) this.minute = values[i++]
      if (values.length > i) this.hour = values[i++]
      if (values.length > i) this.day = values[i++]
      if (values.length > i) this.month = values[i++]
      if (values.length > i) this.week = values[i++]
      if (values.length > i) this.year = values[i]
    },
    calTriggerList: debounce(function () {
      this.calTriggerListInner()
    }, 500),
    calTriggerListInner () {
      // 设置了回调函数
      if (this.remote) {
        this.remote(this.cronValue_c2, +this.startTime, v => { this.preTimeList = v })
        return
      }
      // 去掉年份参数
      const e = this.cronValue_c2
      // console.info('>>>>>>' + e)
      const format = 'yyyy-MM-dd hh:mm:ss'
      const options = {
        currentDate: dateFormat(this.startTime, format)
      }
      const iter = CronParser.parseExpression(e, options)
      const result = []
      for (let i = 0; i < 5; i++) {
        result.push(dateFormat(new Date(iter.next()), format))
      }
      // eslint-disable-next-line no-debugger
      this.preTimeList = result.length > 0 ? result.join('\n') : '无执行时间'
    },
    calStartTime () {
      if (!this.exeStartTime) {
        this.startTime = new Date()
        return
      }
      try {
        this.startTime = new Date(this.exeStartTime)
      } catch (e) {
        this.startTime = new Date()
      }
    }
  }
}
</script>

<style scoped>
.el-cron {
  display: inline-block;
  border: 1px solid #2d8cf0;
}
.content {
  display: flex;
  flex-wrap: nowrap;
}
.left {
  flex-basis: 60%;
  width: 60%;
  border: 1px solid transparent;
  border-right-color: #2d8cf0;
}

.right {
  flex-basis: 40%;
  width: 40%;
}

.ivu-table-small td {
  height: 30px !important;
}

.exe-pre {
  margin-top: 5px;
}

.exe-pre > div {
  margin-top: 5px;
}

.exe-pre-panel {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.exe-pre-panel .p-left {
  flex-basis: 80px;
  flex-grow: 0;
}

.exe-pre-panel .p-right {
  flex-basis: 100px;
  flex-grow: 1;
}
</style>
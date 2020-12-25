# el-cron


#### 1. 介绍
<p>Cron表达式看则简单，但是实际上如果手写的话，非常容易出错的，而且很难及时发现，而el-cron就是为此应运而生的。</p>

<p>el-cron是基于Vue.js和element ui实现crontab表达式的UI组件，支持多种特性，可以方便、快捷直观地定义cron表达式，并支持给定开始时间后的执行时间点，方便排除错误。</p>


#### 2. 使用说明

直接使用el-cron组件
```
import elCron from 'el-cron'
...
<div>
  <el-cron style="width: 700px;"
    v-model="formData.cronValue2"></el-cron>
</div>
```

#### 3. 属性说明


属性名 | 参数类型 | 说明
---|---|---
v-model | String | 双向绑定
disabled | Boolean| 是否禁止编辑
exeStartTime | Number, String, Date| 设置cron表达式开始执行时间
hideSecond | Boolean| 是否隐藏参数<code>秒</code>和<code>年</code>设置，如果隐藏，那么参数<code>秒</code>和<code>年</code>将会全部忽略掉。
hideYear | Boolean| 是否隐藏参数<code>年</code>设置，如果隐藏，那么参数<code>年</code>将会全部忽略掉
remote | Function| 获取预览执行时间列表的函数，格式为：remote (<code>cron值</code>, <code>time时间戳</code>, <code>cb回调函数</code>)

<p>依赖组件列表：</p>

* [element-ui-2.14.1](https://element.eleme.cn/#/zh-CN)
* [vue.js-2.6.1](https://cn.vuejs.org/)
* [cron-parser-2.18.0](https://www.npmjs.com/package/cron-parser)
* [debounce-1.2.0](https://www.npmjs.com/package/debounce)


3.1 支持格式

```
*    *    *    *    *    *   *
┬    ┬    ┬    ┬    ┬    ┬   ┬
│    │    │    │    │    |   └ year (可选)
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59) (可选)
```

#### 4. 项目依赖
由于项目基于`element ui`封装，所以需搭配`element ui`使用
```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
...
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

#### 5. 参考项目


<p>本组件实现参考以下多位大佬：</p>

* [远望の无限](https://gitee.com/ywwxhz/CronExpGenerator)
* [ldy](https://gitee.com/lindeyi/vue-cron)
* [水滴石](https://gitee.com/toktok/easy-cron)

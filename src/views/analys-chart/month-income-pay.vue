<template>
  <div>
    <div class="search">
      <Row>
        <Col span="24" order="3" style="text-align:right">
            <span style="padding-right:15px">
              <label>消费时间：</label>
              <DatePicker :editable="false" type="year" placeholder="Select year" style="width: 200px;text-align:left;"
                          v-model="searchModel.year" @on-change="change"></DatePicker>
            </span>
          <span style="padding-right:15px">
              <label>消费人：</label>
              <Select v-model="searchModel.person" style="width:150px;text-align:left">
                <Option v-for="item in treeSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </span>
          <span style="padding-right:15px">
              <Button type="primary" @click="search">搜索</Button>
            </span>
        </Col>
      </Row>
    </div>
    <div style="width: 100%; height: 700px" ref="chartBar"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import {getSonDicByParentId} from '@/api/dictionary'
import {getMonthIncomePayBar} from '@/api/analysis-chart'

export default {
  data() {
    return {
      searchModel: {
        person: '',
        year: ''
      },
      treeSelect: '',
      chartBar: '',
      chartPie: ''
    }
  },
  methods: {
    search() {
      if (this.searchModel.year == null || this.searchModel.year == '') {
        this.$Message.warning('请选择消费时间');
        return;
      }
      if (this.searchModel.person == null || this.searchModel.person == '') {
        this.$Message.warning('请选择消费人');
        return;
      }
      this.loadChartBar(true)
    },
    getSonDicByParentId() {
      getSonDicByParentId("9e99aff2-27ee-4e91-a245-9e5c650a4911").then(res => {
        if (res.code == 200) {
          this.treeSelect = res.data
        }
      }).catch(err => {

      })
    },
    change(data) {
      this.searchModel.year = data
    },
    initBar(e) {
      //2.初始化
      this.chartBar = echarts.init(this.$refs.chartBar);
      this.loadChartBar(e)
    },
    loadChartBar(e) {
      let _this = this
      getMonthIncomePayBar(this.searchModel).then(res => {
        if (res.code == 200) {
          let data = res.data;
          let pay = []
          let income = []
          if (data[0].barChartVos != null && data[0].barChartVos.length > 0) {
            data[0].barChartVos.forEach((item) => {
              pay.push(item.value)
            })
          }
          if (data[1].barChartVos != null && data[1].barChartVos.length > 0) {
            data[1].barChartVos.forEach((item) => {
              income.push(item.value)
            })
          }

          let option = {
            title: {
              text: '',
              subtext: ''
            },
            legend: {
              data: ['收入', '支出']
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '收入',
                type: 'bar',
                data: income,
                itemStyle: {
                  color: '#87CEFA'
                },
                label: {
                  show: true,
                  position: 'top'
                }
              },
              {
                name: '支出',
                type: 'bar',
                data: pay,
                itemStyle: {
                  color: '#00FFFF'
                },
                label: {
                  show: true,
                  position: 'top'
                }
              }
            ]
          };
          if (e) {
            // 4.传入数据
            _this.chartBar.setOption(option, e);
          } else {
            // 4.传入数据
            _this.chartBar.setOption(option);
          }
        }
      })

    }
  },
  mounted() {
    this.searchModel.person = 'efd5c1ba-d233-42bb-be80-80a2f9b111c7'
    this.searchModel.year = new Date().getFullYear()
    this.getSonDicByParentId()
    this.initBar(false)
  }
}
</script>
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
    <div>
      <Row>
        <Col span="12">
          <div style="width: 100%; height: 700px" ref="chartBar"></div>
        </Col>
        <Col span="12">
          <div style="width: 100%; height: 700px" ref="chartPie"></div>
        </Col>
      </Row>
    </div>

  </div>
</template>
<script>
import echarts from 'echarts'
import {getSonDicByParentId} from '@/api/dictionary'
import {getMonthPayBar} from '@/api/analysis-chart'

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
      this.loadChartPie(true)
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
      getMonthPayBar(this.searchModel).then(res => {
        if (res.code == 200) {
          let data = res.data
          let x_data = []
          let series_data = []
          data.forEach((item) => {
            x_data.push(item.name)
            series_data.push(item.value)
          })
          //3.配置数据
          let option = {
            title: {
              text: this.chartTitle,
            },
            xAxis: {
              type: 'category',
              data: x_data
            }, //X轴
            yAxis: {type: 'value'}, //Y轴
            series: [
              {
                type: 'bar',
                data: series_data,
                itemStyle: {
                  color: '#87CEFA'
                },
                label: {
                  show: true,
                  position: 'top'
                }
              }
            ] //配置项
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
    },
    initPie(e) {
      //2.初始化
      this.chartPie = echarts.init(this.$refs.chartPie);
      this.loadChartPie(e)
    },
    loadChartPie(e) {
      let _this = this
      getMonthPayBar(this.searchModel).then(res => {
        if (res.code == 200) {
          let option = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              left: 'center'
            },
            series: [
              {
                name: '支出',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: res.data
              }
            ]
          };
          if (e) {
            // 4.传入数据
            _this.chartPie.setOption(option, e);
          } else {
            // 4.传入数据
            _this.chartPie.setOption(option);
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
    this.initPie(false)
  }
}
</script>
<template>
  <div class="main">
    <div class="search">
      <Row>
        <Col span="24" order="3" style="text-align:right">
            <span style="padding-right:15px">
              <label>消费时间：</label>
              <DatePicker :editable="false" type="month" placeholder="Select month"
                          style="width: 200px;text-align:left;" v-model="searchModel.year"
                          @on-change="change"></DatePicker>
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
    <Tabs class="tabs" value="name1">
      <TabPane label="列表" name="name1" class="tabs-item">
        <Table :columns="table_columns" :data="table_data"></Table>
      </TabPane>
      <TabPane label="图表" name="name2" class="tabs-item">
        <div style="width: 100%; height: 700px" ref="chart"></div>
      </TabPane>
    </Tabs>

  </div>
</template>
<script>
import echarts from 'echarts'
import {getOneselfMonthPageList} from '@/api/analysis-api'
import {getSonDicByParentId} from '@/api/dictionary'
import {getMonthTotal} from '@/api/analysis-chart'

export default {
  data() {
    return {
      table_columns: [
        {
          title: '月',
          key: 'months'
        },
        {
          title: '消费人',
          key: 'detailName'
        },
        {
          title: '生活',
          key: 'sh'
        },
        {
          title: '交通',
          key: 'jt'
        },
        {
          title: '购物',
          key: 'gw'
        },
        {
          title: '车贷',
          key: 'cd'
        },
        {
          title: '通讯',
          key: 'tx'
        },
        {
          title: '休闲',
          key: 'xx'
        },
        {
          title: '水电',
          key: 'sd'
        },
        {
          title: '房租',
          key: 'fz'
        },
        {
          title: '转账',
          key: 'zz'
        },
        {
          title: '医药',
          key: 'yy'
        },
        {
          title: '红包',
          key: 'hb'
        },
        {
          title: '其他',
          key: 'other'
        },
        {
          title: '合计',
          key: 'total'
        }
      ],
      table_data: [],
      searchModel: {
        person: '',
        year: ''
      },
      treeSelect: '',
      chartTitle: ''
    }
  },
  methods: {
    search() {
      this.chartTitle = this.$moment(this.searchModel.year).format("YYYY年MM月") + '消费分布';
      if (this.searchModel.year == null || this.searchModel.year == '') {
        this.$Message.warning('请选择消费时间');
        return;
      }
      if (this.searchModel.person == null || this.searchModel.person == '') {
        this.$Message.warning('请选择消费人');
        return;
      }
      this.searchModel.year = this.$moment(this.searchModel.year).format("YYYY-MM");
      this.getOneselfMonthPageList(this.searchModel)
      this.loadChart(true)
    },
    getOneselfMonthPageList(modal) {
      getOneselfMonthPageList(modal).then(res => {
        if (res.code == 200) {
          this.table_data = res.data
        }
      })
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
    init(e) {
      //2.初始化
      this.chart = echarts.init(this.$refs.chart);
      this.loadChart(e)
    },
    loadChart(e) {
      let _this = this
      getMonthTotal(this.searchModel).then(res => {
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
            xAxis: {type: 'category', data: x_data}, //X轴
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
          // 4.传入数据
          if (e) {
            _this.chart.setOption(option, e);
          } else {
            _this.chart.setOption(option);
          }
        }
      })
    }
  },
  mounted() {
    this.searchModel.person = 'efd5c1ba-d233-42bb-be80-80a2f9b111c7'
    this.searchModel.year = this.$moment(new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1))).format("YYYY-MM");
    this.chartTitle = this.$moment(this.searchModel.year).format("YYYY年MM月") + '消费分布';
    this.getSonDicByParentId()
    this.getOneselfMonthPageList(this.searchModel)
    this.init(false)
  }
}
</script>
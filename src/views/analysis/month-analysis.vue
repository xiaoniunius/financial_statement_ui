<template>
    <div>
      <div class="search">
        <Row>
          <Col span="24" order="3" style="text-align:right">
            <span style="padding-right:15px">
              <label>消费时间：</label>
              <DatePicker :editable="false" type="year" placeholder="Select year" style="width: 200px;text-align:left;" v-model="searchModel.year" @on-change="change"></DatePicker>
            </span>
            <span style="padding-right:15px">
              <Button type="primary" @click="search">搜索</Button>
            </span>
          </Col>
        </Row>
      </div>
      <Table :columns="table_columns" :data="table_data"></Table>
    </div>
</template>
<script>
import { getMonthPageList } from '@/api/analysis-api'
export default {
  data () {
    return {
      table_columns: [
        {
          title: '月',
          key: 'months',
          render: (h, params) => {
              if(params.row.months>12){
                return h('div', '总合计');
              }
              else{
                return h('div', params.row.months);
              }
            
          }
        },
        {
          title: '交通',
          key: 'jt'
        },
        {
          title: '其他',
          key: 'other'
        },
        {
          title: '房租',
          key: 'fz'
        },
        {
          title: '水电',
          key: 'sd'
        },
        {
          title: '生活',
          key: 'sh'
        },
        {
          title: '红包',
          key: 'hb'
        },
        {
          title: '购物',
          key: 'gw'
        },
        {
          title: '转账至田坤坤',
          key: 'zztkk'
        },
        {
          title: '转账李春明',
          key: 'zzlcm'
        },
        {
          title: '车贷',
          key: 'cd'
        },
        {
          title: '合计',
          key: 'total'
        }
      ],
      table_data: [],
      searchModel: {
        year:''
      }
    }
  },
  methods: {
    search () {
      this.getMonthPageList(this.searchModel);
    },
    getMonthPageList(modal){
      getMonthPageList(modal).then(res => {
            if (res.code == 200) {
              this.table_data = res.data
              this.total = res.total
            }
      })
    },
    change(data){
        this.searchModel.year=data
    }
  },
  mounted () {
    this.searchModel.year=new Date().getFullYear()
    this.getMonthPageList(this.searchModel)
  }
}
</script>
<style>
.search{
  margin-bottom:10px;
}
</style>
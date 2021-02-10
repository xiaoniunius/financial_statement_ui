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
      <Table :columns="table_columns" :data="table_data"></Table>
    </div>
</template>
<script>
import { getOneselfMonthPageList } from '@/api/analysis-api'
import { getSonDicByParentId } from '@/api/dictionary'
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
        person: '',
        year:''
      },
      treeSelect:''
    }
  },
  methods: {
    search () {
      if(this.searchModel.year==null || this.searchModel.year==''){
        this.$Message.warning('请选择消费时间');
        return;
      }
      if(this.searchModel.person==null || this.searchModel.person==''){
        this.$Message.warning('请选择消费人');
        return;
      }
      this.getOneselfMonthPageList(this.searchModel)
    },
    getOneselfMonthPageList(modal){
      getOneselfMonthPageList(modal).then(res => {
            if (res.code == 200) {
              this.table_data = res.data
            }
      })
    },
    getSonDicByParentId(){
      getSonDicByParentId("9e99aff2-27ee-4e91-a245-9e5c650a4911").then(res=>{
        if(res.code==200){
          this.treeSelect=res.data
        }
      }).catch(err=>{

      })
    },
    change(data){
        this.searchModel.year=data
    }
  },
  mounted () {
    this.searchModel.year=new Date().getFullYear()
    this.getSonDicByParentId()
  }
}
</script>
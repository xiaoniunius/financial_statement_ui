<template>
    <div>
      <div class="search">
        <Row>
           <Col span="24" order="3" style="text-align:right">
            <span style="padding-right:15px">
              <label>开始时间：</label>
              <DatePicker :editable="false" type="year" placeholder="start year" style="width: 200px;text-align:left;" v-model="searchModel.startYear" @on-change="changeStart"></DatePicker>
            </span>
           <span style="padding-right:15px">
              <label>结束时间：</label>
              <DatePicker :editable="false" type="year" placeholder="end year" style="width: 200px;text-align:left;" v-model="searchModel.endYear" @on-change="changeEnd"></DatePicker>
            </span>
            <span style="padding-right:15px">
              <Button type="primary" @click="search">搜索</Button>
            </span>
          </Col>
        </Row>
      </div>
      <Table :columns="table_columns" :data="table_data"></Table>
      <Page ref="pages" :total="total" show-elevator style="margin-top:15px;" @on-change="pageChange" />
    </div>
</template>
<script>
import { getTotalPageList } from '@/api/analysis-api'
export default {
  data () {
    return {
      total: 1,
      table_columns: [
        {
          title: '年',
          key: 'year'
        },
        {
          title: '工资',
          key: 'number'
        },
        {
          title: '消费',
          key: 'moneys'
        }
      ],
      table_data: [],
      searchModel: {
        startYear: '',
        endYear: '',
        soryBy:'year',
        sort:'asc',
        pageIndex: '1',
        pageSize: '10'
      }
    }
  },
  methods: {
    pageChange (pageIndex) {
      this.searchModel.pageIndex=pageIndex;
      this.getTotalPageList(this.searchModel);
    },
    getTotalPageList(modal,isSearch){
      getTotalPageList(modal).then(res => {
            if (res.code == 200) {
              this.table_data = res.data
              this.total = res.total
            }
            if(isSearch){
              this.$nextTick(function(){
                this.$refs['pages'].currentPage = 1;
              })
            }
      })
    },
    search(){
      this.searchModel.pageIndex = 1
      this.getTotalPageList(this.searchModel,true)
    },
    changeStart(data){
      this.searchModel.startYear = data
    },
    changeEnd(data){
      this.searchModel.endYear = data
    }
  },
  mounted () {
      this.searchModel.startYear=new Date().getFullYear()
      this.searchModel.endYear=new Date().getFullYear()
    this.getTotalPageList(this.searchModel)
  }
}
</script>
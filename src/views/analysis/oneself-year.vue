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
      <Page refs="pages" :total="total" show-elevator style="margin-top:15px;" @on-change="pageChange" />
    </div>
</template>
<script>
import { getYearPageList } from '@/api/analysis-api'
import { getSonDicByParentId } from '@/api/dictionary'
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
          title: '姓名',
          key: 'name'
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
        person: '',
        year: '',
        soryBy:'year',
        sort:'asc',
        pageIndex: '1',
        pageSize: '10'
      },
      treeSelect:''
    }
  },
  methods: {
    pageChange (pageIndex) {
      this.searchModel.pageIndex=pageIndex;
      this.getYearPageList(this.searchModel);
    },
    getYearPageList(modal,isSearch){
      getYearPageList(modal).then(res => {
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
      if(this.searchModel.year==null || this.searchModel.year==''){
        this.$Message.warning('请选择消费时间');
        return;
      }
      if(this.searchModel.person==null || this.searchModel.person==''){
        this.$Message.warning('请选择消费人');
        return;
      }
      this.searchModel.pageIndex=1;
      this.getYearPageList(this.searchModel,true)
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
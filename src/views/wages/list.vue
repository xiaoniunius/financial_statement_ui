<template>
    <div>
      <div class="search">
        <Row>
          <Col span="3" order="4">
            <Button type="primary" @click="add">新增</Button>
          </Col>
          <Col span="21" order="3" style="text-align:right">
            <span style="padding-right:15px">
              <label>消费人：</label>
              <Select v-model="searchModel.type" style="width:150px;text-align:left">
                <Option v-for="item in treeSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </span>
            <span style="padding-right:15px">
              <label>工资时间：</label>
              <DatePicker type="month" placeholder="Select date" style="width: 200px" v-model="searchModel.startTime"></DatePicker>
              <label style="padding:0px 8px">至</label>
              <DatePicker type="month" placeholder="Select date" style="width: 200px" v-model="searchModel.endTime"></DatePicker>
            </span>
            <span style="padding-right:15px">
              <Button type="primary" @click="search">搜索</Button>
            </span>
          </Col>
        </Row>
      </div>
      <Table :columns="table_columns" :data="table_data"></Table>
      <Page :total="total" show-elevator style="margin-top:15px;" @on-change="pageChange" />

      <Modal
        v-model="modalStatus"
        :title="title"
        :loading="loading"
        :footer-hide="true">
         <edit v-if="modalStatus" v-on:asyncOK="asyncOK" v-on:asyncNO="asyncNO" :treeSelect="treeSelect" :modalData="modalData" />
      </Modal>
    </div>
</template>
<script>
import edit from '@/components/wages/edit'
import { add,deletes,update,getPageList,getWagesInfoById } from '@/api/wagesApi'
import { getSonDicByParentId } from '@/api/dictionary'
export default {
  data () {
    return {
      total: 1,
      modalStatus: false,
      loading: true,
      title:'新增',
      modalData:"",
      table_columns: [
        {
          title: '工资',
          key: 'number'
        },
        {
          title: '所有人',
          key: 'name'
        },
        {
          title: '工资时间',
          key: 'logicTime',
          render: (h, params) => {
            return h('div', this.$moment(params.row.logicTime).format("YYYY-MM-DD"));
          }
        },
        {
          title: '登记时间',
          key: 'createTime',
          render: (h, params) => {
            return h('div', this.$moment(params.row.createTime).format("YYYY-MM-DD HH:mm:ss"));
          }
        },
        {
          title: '操作',
          key: '',
          width:150,
          render: (h, params) => {
            let _this=this
            let modal=this.searchModel
            return h('div', [
              h('label', {
		            style: {marginRight: '15px'},
		            on: {
		                click: (e) => {
                      _this.$Modal.confirm({
                        title: '删除',
                        content: '<p>该操作将导致基础数据无法恢复，请谨慎操作！</p>',
                        onOk: () => {
                          deletes(params.row.id).then(res =>{
                            if(res.code == 200){
                              _this.$Message.success('删除成功');
                              _this.getPageList(modal)
                            }
                          })
                        },
                        onCancel: () => {

                        }
                      });          
		                }
		            }
		          }, '删除'),
              h('label', {
		            style: {marginRight: '15px'},
                on: {
		                click: (e) => {
                        getWagesInfoById(params.row.id).then(res=>{
                          _this.modalData=res.data
                          this.modalStatus = true
                        })
		                }
		            }
		          }, '修改')
            ]);
          }
        }
      ],
      table_data: [],
      searchModel: {
        type: '',
        startTime: '',
        endTime: '',
        soryBy:'create_time',
        sort:'desc',
        pageIndex: '1',
        pageSize: '10'
      },
      treeSelect:[]
    }
  },
  components: {
    edit
  },
  methods: {
    search(){
      this.searchModel.pageIndex = 1
      this.getPageList(this.searchModel,true)
    },
    pageChange (pageIndex) {
      this.searchModel.pageIndex=pageIndex;
      this.getPageList(this.searchModel);
    },
    asyncOK (data) {
      this.searchModel.pageIndex = 1
      let modal=this.searchModel
      let _this=this;
      if(data.id){
        update(data).then(res=>{
          if(res.code==200){
            _this.$Message.info(res.message)
            _this.modalStatus = false;
            _this.getPageList(modal,true)
          }
        })
      }else{
        add(data).then(res=>{
          if(res.code==200){
            _this.$Message.info(res.message)
            _this.modalStatus = false;
            _this.getPageList(modal,true)
          }
        })
      }
      
    },
    asyncNO(){
      this.modalStatus = false;
    },
    add(){
      this.modalStatus = true;
    },
    getSonDicByParentId(){
      getSonDicByParentId("9e99aff2-27ee-4e91-a245-9e5c650a4911").then(res=>{
        if(res.code==200){
          this.treeSelect=res.data
        }
      }).catch(err=>{

      })
    },
    getPageList(modal,isSearch){
      getPageList(modal).then(res => {
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
    }
  },
  mounted () {
    this.getPageList(this.searchModel)
    this.getSonDicByParentId()
  }
}
</script>
<style>
.search{
  margin-bottom:10px;
}
</style>
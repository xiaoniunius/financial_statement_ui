<template>
    <div>
      <Row>
        <Col span="4">
          <Tree :data="treeData" @on-select-change="selectChange"></Tree>
        </Col>
        <Col span="20">
          <div class="header">
            <Row>
              <Col span="6">
                <Button type="primary" @click="add">新增</Button>
              </Col>
              <Col span="6">
              </Col>
              <Col span="6">
              </Col>
              <Col span="6">
              </Col>
            </Row>
          </div>
          <Table :columns="table_columns" :data="table_data"></Table>
          <Page :total="total" show-elevator style="margin-top:15px;" @on-change="pageChange" />
        </Col>
      </Row>
      <Modal
        v-model="modalStatus"
        :title="modalTitle"
        :loading="loading"
        :footer-hide="true">
        <edit v-if="modalStatus" v-on:asyncOK="asyncOK" v-on:asyncNO="asyncNO" :parentId="treeSelectId" :sort="sort" :id="id" />
      </Modal>
    </div>
</template>
<script>
import edit from '@/components/dictionary/edit'
import { getDicTree, getDetailById, getPageList, deletes, add, getDicSort, update } from '@/api/dictionary'
export default {
  data () {
    return {
      id: '',
      total: 1,
      modalStatus: false,
      loading: true,
      treeSelectId:'',
      modalTitle:'',
      sort:'',
      searchModel: {
        pageIndex: '1',
        pageSize: '10',
        parentId:'',
        name:'',
        soryBy: 'sort',
        sort :'asc'
      },
      treeData:[],
      table_columns: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '创建时间',
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
		            style: {marginRight: '15px',cursor: 'pointer'},
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
                              _this.getDicTree()
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
		            style: {marginRight: '15px',cursor: 'pointer'},
                on: {
		                click: (e) => {
                      _this.modalTitle='修改'
		                  this.id=params.row.id
                      _this.modalStatus=true
		                }
		            }
		          }, '修改')
            ]);
          }
        }
      ],
      table_data: []
    }
  },
  components:{
    edit
  },
  methods: {
    search () {
      this.searchModel.pageIndex = 1
    },
    pageChange (pageIndex) {
      this.searchModel.pageIndex=pageIndex;
      this.getPageList(this.searchModel);
    },
    asyncOK (data) {
      let modal=this.searchModel
      let _this=this;
      if(data.id==null||data.id==''){
        add(data).then(res=>{
          if(res.code==200){
            _this.$Message.info(res.message)
            _this.modalStatus = false
            _this.getPageList(modal)
            _this.getDicTree()
          }
        })
      }
      else{
        update(data).then(res=>{
          if(res.code==200){
            _this.$Message.info(res.message)
            _this.modalStatus = false
            _this.getPageList(modal)
            _this.getDicTree()
          }
        })
      }
    },
    asyncNO () {
      this.modalStatus = false;
    },
    add(){
      let _this=this
      this.id=""
      if(this.treeSelectId!=null&&this.treeSelectId!=''){
        getDicSort().then(res=>{
          if(res.code==200){
            _this.sort=res.data
            _this.modalTitle='新增'
            _this.modalStatus=true
          }
        })
      }
      else{
        this.$Message.warning('请选择节点')
      }
    },
    selectChange(e){
      this.treeSelectId=e[0].id;
      this.searchModel.parentId=e[0].id;
      this.getPageList(this.searchModel)
    },
    getPageList(data){
      let _this=this;
      getPageList(data).then(res=>{
        if(res.code==200){
          _this.table_data=res.data
          _this.total=res.total
        }
      })
    },
    getDicSort(){
      let _this=this;
      getDicSort().then(res=>{
        if(res.code==200){
          _this.sort=res.data
        }
      })
    },
    getDicTree(){
      let _this=this;
      getDicTree().then(res=>{
          if(res.code==200){
            _this.treeData=res.data
          }
      })
    }
  },
  mounted(){
    this.getDicTree()
    this.getDicSort()
  }
}
</script>
<style>
.header{
  margin-bottom:10px;
}
</style>
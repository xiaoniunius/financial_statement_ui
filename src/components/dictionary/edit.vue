<template>
    <Form :model="formItem" :label-width="80" ref="formItem">
        <FormItem label="名称" prop="name">
            <Input v-model="formItem.name" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="序号">
            <Input v-model="formItem.sort" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
            <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem style="text-align:right">
            <Button @click="cancle">取消</Button>
            <Button type="primary" style="margin-left: 15px" @click="submit">提交</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
  data () {
    return {
      formItem: {
        name: '',
        sort:'',
        remark: '',
        parentId:''
      }
    }
  },
  props:["parentId","sort"],
  methods:{
      cancle(){
        this.$emit('asyncNO')
          this.$refs['formItem'].resetFields();
      },
      submit(){
        this.formItem.parentId=this.parentId
        this.$emit("asyncOK",this.formItem)
        this.$refs['formItem'].resetFields()
      }
  },
  mounted(){
    this.formItem.sort=this.sort
  }
}
</script>

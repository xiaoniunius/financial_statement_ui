<template>
    <Form :model="formItem" :label-width="80" ref="formItem">
        <FormItem label="金额" prop="number">
            <Input type="number" v-model="formItem.number" style="width:100%" placeholder="Select your number"></Input>
        </FormItem>
        <FormItem label="所有人" prop="type">
            <Select v-model="formItem.type" placeholder="Select your type">
                <Option v-for="item in treeSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="类型" prop="type">
            <Select v-model="formItem.srType" placeholder="Select your type">
                <Option v-for="item in treeSrSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="工资时间" prop="date">
            <DatePicker type="date" v-model="formItem.logicTime" placeholder="Select date" style="width:100%"></DatePicker>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="remark..."></Input>
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
        number: '',
        type:'',
        srType: '',
        logicTime: '',
        id:'',
        remark:''
      }
    }
  },
  props:["treeSelect","modalData","treeSrSelect"],
  methods:{
      cancle(){
        this.$emit('asyncNO')
          this.$refs['formItem'].resetFields();
      },
      submit(){
        this.$emit("asyncOK",this.formItem)
        this.$refs['formItem'].resetFields()
      }
  },
  mounted(){
      this.formItem.id=this.modalData.id
      this.formItem.number=this.modalData.number
      this.formItem.type=this.modalData.type
      this.formItem.srType=this.modalData.srType
      this.formItem.remark=this.modalData.remark
      this.formItem.logicTime=this.modalData.logicTime
  }
}
</script>

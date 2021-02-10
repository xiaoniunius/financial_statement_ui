<template>
    <Form :model="formItem" :label-width="80" ref="formItem">
        <FormItem label="消费" prop="moneys">
            <Input type="number" v-model="formItem.moneys" style="width:100%" placeholder="Select your moneys"></Input>
        </FormItem>
        <FormItem label="消费人" prop="person">
            <Select v-model="formItem.person" placeholder="Select your person">
                <Option v-for="item in treeSelectPerson" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="类型" prop="type">
            <Select v-model="formItem.type" placeholder="Select your type">
                <Option v-for="item in treeSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="消费时间" prop="date">
            <DatePicker type="date" v-model="formItem.logicTime" placeholder="Select date" style="width:100%"></DatePicker>
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
        moneys: '',
        person:'',
        type:'',
        logicTime: '',
        remark:'',
        id:''
      }
    }
  },
  props:["treeSelect","treeSelectPerson","modalData"],
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
      this.formItem.moneys=this.modalData.moneys
      this.formItem.person=this.modalData.person
      this.formItem.type=this.modalData.type
      this.formItem.logicTime=this.modalData.logicTime
      this.formItem.remark=this.modalData.remark
      this.formItem.id=this.modalData.id
  }
}
</script>

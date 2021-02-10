<template>
    <Form :model="formItem" :label-width="80" ref="formItem">
        <FormItem label="工资" prop="number">
            <Input type="number" v-model="formItem.number" style="width:100%" placeholder="Select your number"></Input>
        </FormItem>
        <FormItem label="所有人" prop="type">
            <Select v-model="formItem.type" placeholder="Select your type">
                <Option v-for="item in treeSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="工资时间" prop="date">
            <DatePicker type="date" v-model="formItem.logicTime" placeholder="Select date" style="width:100%"></DatePicker>
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
        logicTime: '',
        id:''
      }
    }
  },
  props:["treeSelect","modalData"],
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
    console.log(this.modalData)
      this.formItem.id=this.modalData.id
      this.formItem.number=this.modalData.number
      this.formItem.type=this.modalData.type
      this.formItem.logicTime=this.modalData.logicTime
  }
}
</script>

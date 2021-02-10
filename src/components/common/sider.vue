<template>
  <Menu active-name="wages" theme="light" width="auto" :open-names="['1']" @on-select="select">
    <Submenu name="1">
        <template slot="title">
            <Icon type="ios-navigate"></Icon>
            账单管理
        </template>
        <MenuItem name="wages">工资管理</MenuItem>
        <MenuItem name="detail">消费管理</MenuItem>
        <MenuItem name="dictionary">字典管理</MenuItem>
    </Submenu>
    <Submenu name="2">
        <template slot="title">
            <Icon type="ios-navigate"></Icon>
            统计管理
        </template>
        <MenuItem name="total-year-analysis">年度统计</MenuItem>
        <MenuItem name="total-oneself-year-analysis">个人年度统计</MenuItem>
        <MenuItem name="total-month-analysis">月度统计</MenuItem>
        <MenuItem name="total-oneself-month-analysis">个人月度统计</MenuItem>
        <MenuItem name="chart-analysis">图表分析</MenuItem>
    </Submenu>
  </Menu>
</template>
<script>
export default {
  methods: {
    select (e) {
      switch (e) {
        case "wages":
          this.$router.push("/wages/list")
          break
        case "detail":
          this.$router.push("/detail/list")
          break
        case "dictionary":
          this.$router.push("/dictionary/list")
          break
        case "total-year-analysis":
          this.$router.push("/analysis/total")
          break
        case "total-oneself-year-analysis":
          this.$router.push("/analysis/oneself-year")
          break
        case "total-month-analysis":
          this.$router.push("/analysis/month-analysis")
          break
        case "total-oneself-month-analysis":
          this.$router.push("/analysis/oneself-month")
          break
        case "chart-analysis":
          this.$router.push("/analysis/chart")
          break
      }
    }
  },
  mounted () {
    this.$router.push("/wages/list")
  }
}
</script>
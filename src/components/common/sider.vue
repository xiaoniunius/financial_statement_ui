<template>
  <Menu active-name="wages" theme="light" width="auto" :open-names="['1']" @on-select="select">
    <Submenu name="1">
        <template slot="title">
          <Icon type="ios-create" />
            账单管理
        </template>
        <MenuItem name="budget">预算管理</MenuItem>
        <MenuItem name="wages">收入管理</MenuItem>
        <MenuItem name="detail">支出管理</MenuItem>
    </Submenu>
    <Submenu name="2">
        <template slot="title">
          <Icon type="logo-yen" />
            统计管理
        </template>
      <MenuItem name="total-month-analysis">月度统计</MenuItem>
        <MenuItem name="total-year-analysis">年度统计</MenuItem>
    </Submenu>
    <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
            报表分析
        </template>
        <MenuItem name="month-pay-contrast">月度支出对比</MenuItem>
        <MenuItem name="year-pay-contrast">年度支出对比</MenuItem>
        <MenuItem name="month-income-pay">月度收支对比</MenuItem>
        <MenuItem name="year-income-pay">年度收支对比</MenuItem>
    </Submenu>
    <Submenu name="4">
      <template slot="title">
        <Icon type="md-settings" />
        系统管理
      </template>
      <MenuItem name="dictionary">字典管理</MenuItem>
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
          this.$router.push("/analysis/oneself-year")
          break
        case "total-month-analysis":
          this.$router.push("/analysis/oneself-month")
          break
        case "month-pay-contrast":
          this.$router.push("/analysis-chart/month-pay")
          break
        case "year-pay-contrast":
          this.$router.push("/analysis-chart/year-pay")
          break
        case "month-income-pay":
          this.$router.push("/analysis-chart/month-income-pay")
          break
        case "year-income-pay":
          this.$router.push("/analysis-chart/year-income-pay")
          break
      }
    }
  },
  mounted () {
    this.$router.push("/wages/list")
  }
}
</script>
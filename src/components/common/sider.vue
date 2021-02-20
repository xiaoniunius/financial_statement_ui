<template>
  <Menu ref="side_menu" :active-name="active_name" theme="light" width="auto" :open-names="open_names"
        @on-select="select" accordion="true">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-create"/>
        账单管理
      </template>
      <MenuItem name="budget">预算管理</MenuItem>
      <MenuItem name="wages">收入管理</MenuItem>
      <MenuItem name="detail">支出管理</MenuItem>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="logo-yen"/>
        统计管理
      </template>
      <MenuItem name="total-month-analysis">月度统计</MenuItem>
      <MenuItem name="total-year-analysis">年度统计</MenuItem>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <Icon type="ios-stats"/>
        报表分析
      </template>
      <MenuItem name="month-pay-contrast">月度支出对比</MenuItem>
      <MenuItem name="year-pay-contrast">年度支出对比</MenuItem>
      <MenuItem name="month-income-pay">月度收支对比</MenuItem>
      <MenuItem name="year-income-pay">年度收支对比</MenuItem>
    </Submenu>
    <Submenu name="4">
      <template slot="title">
        <Icon type="md-settings"/>
        系统管理
      </template>
      <MenuItem name="dictionary">字典管理</MenuItem>
    </Submenu>
  </Menu>
</template>
<script>
export default {
  data() {
    return {
      active_name: '',
      open_names: []
    }
  },
  methods: {
    select(e) {
      switch (e) {
        case "budget":
          this.$router.push("/budget/list")
          break
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
  created() {
    this.active_name = 'budget'
    this.open_names = ["1"]
    this.$nextTick(() => {
      this.$refs.side_menu.updateOpened();
      this.$refs.side_menu.updateActiveName();
      this.$router.push("/budget/list")
    });
  },
  watch: {
    '$route.path': function (newVal) {
      //console.log(newVal+"---"+oldVal);
      if (newVal.indexOf('/detail/list') >= 0) {
        this.open_names = ["1"]
        this.active_name = 'detail'
        this.$nextTick(() => {
          this.$refs.side_menu.updateOpened();
          this.$refs.side_menu.updateActiveName();
        });
      } else if (newVal.indexOf('/wages/list') >= 0) {
        this.open_names = ["1"]
        this.active_name = 'wages'
        this.$nextTick(() => {
          this.$refs.side_menu.updateOpened();
          this.$refs.side_menu.updateActiveName();
        });
      } else if (newVal.indexOf('/analysis-chart/year-income-pay') >= 0) {
        this.show = false
        this.active_name = 'year-income-pay'
        this.show = true
      }
    }
  }
}
</script>
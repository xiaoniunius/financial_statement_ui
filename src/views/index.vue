<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.custom-header {
  color: #f5f7f9;
  font-size: 40px;
  text-align: right;
}
</style>
<template>
    <div class="layout">
        <Layout style="height:100%;">
            <Header>
                    <div class="custom-header">小胖叽专用</div>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <sider-menu></sider-menu>
                </Sider>
                <Layout :style="{padding: '24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import siderMenu from "../components/common/sider";
export default {
  components: { siderMenu }
}
</script>
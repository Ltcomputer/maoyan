<template>
  <div id="app">

    <keep-alive>
      <router-view/>
    </keep-alive>

    <tabs v-model="selectIndex">
      <tab-item v-for="(tabItem, index) in tabList" :key="index"
        :name="tabItem.name" :icon="tabItem.icon">
      </tab-item>
    </tabs>


      <!-- <div class="tab">
          <router-link to="/movie">电影</router-link>
          <router-link to="/cinema">影院</router-link>
          <router-link to="/mine">我的</router-link>
      </div> -->
  </div>
</template>
<script>
export default {
  data(){
    return {
      tabList: [
        {name: '电影', icon: 'iconfont iconfont-movie', path: '/movie'},
        {name: '影院', icon: 'iconfont iconfont-yingyuan', path: '/cinema'},
        {name: '我的', icon: 'iconfont iconfont-wode', path: '/mine'}
      ],
      selectIndex: 0
    }
  },
  watch: {
    selectIndex(newVal){
      let path = this.tabList[newVal].path;
      this.$router.push(path);
    }
  }
}
</script>


<style lang="scss">
    // .tab{
    //   position: absolute;
    //   left: 0;
    //   bottom: 0;
    //   width: 100%;
    //   display: flex;
    //   line-height: 49px;

    //   justify-content: space-around;
    //   .router-link-active{
    //     color: lightblue;
    //   }
    // }
</style>

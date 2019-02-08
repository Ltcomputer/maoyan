<template>
<div>
    <div class="page" id="cinema">
          <app-header title="影院"></app-header>
           <header class="sub-header">
            <span class="city-icon" @click="goCityList()">
                {{city}}
            </span>
            <nav class="nav">
                <li>
                   
            <div class="search-btn" @click="goSearch()">
                搜影院
            </div>
                </li>
            </nav>
        </header>
       <app-content :style="{top: '125px', bottom: '0'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
                <ul class="item-list">
                  <li class="item" v-for="cinema in cinemasList" :key="cinema.index">
                   <span class="item_nm">{{cinema.nm}}</span> <em class="item_price" v-if="cinema.sellPrice != 0"><i>{{cinema.sellPrice}}</i> 元起</em>
                    <p class="item_addr">
                      <span>{{cinema.addr}}</span>
                      <span class="item_distance">{{cinema.distance}}</span>
                     </p>
                     <p>
                       <span class="allowRefund" v-if="cinema.tag.allowRefund==1">
                        退
                       </span>
                       <span class="endorse" v-if="cinema.tag.endorse==1">
                            改签
                       </span>
                       <span class="vipTag" v-if="cinema.tag.vipTag">
                            折扣卡
                       </span>
                     </p>
                    <div class="item_card" v-if="cinema.promotion.cardPromotionTag">
                        <div class="discount-label-card">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg==" alt="">
                        </div> 
                        <div class="discount-label-text">
                               {{cinema.promotion.cardPromotionTag}}
                        </div>
                      </div>

                    </li>
                </ul>
       </app-content>
    </div>
    <router-view></router-view>
     <div class="tab">
        <div class="itemList">
            <li class="item" v-for="(item,index) in tabList" :key="index"><span class="item-t">{{item}}</span></li>
        </div>
    </div>

</div>
</template>

<script>
import { mapState } from "vuex";
import { getCinemaList,getMoreCinemaList } from '../../services/cinemaService'
export default {
  components: {},
  data() {
    return {
      tabList: ["全城", "品牌", "特色"],
      tabIndex: 0,
      cinemasList:[],
      cinemasOffset: 0,
       canLoadMore: true
    };
  },
  computed: {
    ...mapState(["city","cityID"])
  },
  methods: {
    //进入城市列表页面，选择城市
    goCityList() {
      this.$router.push("/movie/city-list");
    },
    goSearch(){
      this.$router.push('./cinema/search');
    },
    loadMoreData(){
        console.log('执行加载更多');
            // 发送请求
            // this.canLoadMore = false;
            this.cinemasOffset += 20;
            // console.log(this.cinemasOffset)
            getMoreCinemaList(this.cityID,this.cinemasOffset).then(result=>{
              // console.log(this.cinemasList)
              this.cinemasList = [...this.cinemasList, ...result];
               
                // if(this.cinemasList.length >= this.cinemaIDS.length){
                  //     //加载完毕
                //     this.canLoadMore = false;
                // }else{
                  //     //还可以继续加载
                //     this.canLoadMore = true;
                // }
            })
        }
    },

   
  created(){
      // 调用得到数据
      console.log(this.cityID);
    getCinemaList(this.cityID).then(({data,offset})=>{
      this.cinemasList = data;
      this.cinemasOffset = offset;
      console.log(offset);
      
    })
},
watch:{
  cityID(){
      getCinemaList(this.cityID).then(({data,offset})=>{
      this.cinemasList = data;
      this.cinemasOffset = offset;
      // console.log(offset);
      
    })
  }
},

  }

</script>

<style lang="scss" scoped>
.page {
  padding-top: 44px;
}
.sub-header {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #e6e6e6;
  position: absolute;
  left: 0;
  top: 44px;
  color: #666;
  font-size: 14px;
  display: flex;
  .nav {
    width: 80%;
    display: flex;
    flex: 3;
    li {
      width: 91%;
      padding-left: 9px;
      padding-top: 6px;
    }
    .search-btn {
      height: 29px;
      width: 100%;
      height: 28px;
      font-size: 13px;
      line-height: 28px;
      color: #b2b2b2;
      border: 0.5px solid #e6e6e6;
      border-radius: 5px;
    }
  }
  .city-icon {
    flex: 1;
    text-align: center;
    line-height: 44px;
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top: 6px solid #666;
      transform: translateY(4px);
    }
  }
}
.tab {
  position: absolute;
  top: 88px;
  width: 100%;
  .itemList{
      display: flex;
      width: 100%;
  }
  .item{
      flex: 1;
      text-align: center;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      border-bottom:1px solid #e8e8e8;
      .item-t{
        &::after{
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top: 6px solid #666;
            transform: translateY(4px);
          
      }
      }
     
  }
}
.item-list{
  .item{
    padding: 10px;
    // height: 110px;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
      .item_nm{
        font-style:normal;
        font-size: 16px;
      }
      .item_price{
          font-style: normal;
          color: #f03d37;
          padding-left: 10px;
          font-size: 14px;
          i{
            font-size: 18px;
            font-style: normal;
          }
      }
      .item_addr{
          text-overflow: ellipsis;
          // overflow: hidden;
          white-space: nowrap;
          // width: 80%;
          font-size: 14px;
          color: #666;
          padding-top: 15px;
          span:nth-child(1){
            font-size: 12px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              width: 80%;
              display: inline-block;
          }
      }
      .item_distance{
            // position: absolute;
          // right: 10%;
          // padding-left: 3%;
          display: inline-block;

          color: #666;
      }
      .item_card{
        font-size: 12px;
        color: #999;
        padding-top: 15px;

      }
      .allowRefund,.endorse{
            color: #589daf;
            border: 1px solid #589daf;
            font-size: .6rem;
            padding: 0 3px;
            margin-right: 5px;
            height: 15px;
            line-height: 15px;
            border-radius: 2px;
            text-align: center;
      }
      .vipTag{
          color: #f90;
          border: 1px solid #f90;
          font-size: .6rem;
          padding: 0 3px;
          margin-right: 5px;
      }
      .discount-label-card{
          width: 15px;
          height: 14px;
          position: relative;
          top: 3px;
          display: inline-block;
          img{
            width: 100%;
          }
      }
      .discount-label-text{
            margin-left: 0;
            font-size: 11px;
            display: inline-block;
      }
  }

}
</style>
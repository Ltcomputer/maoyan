<template>
<app-content :style="{top: '88px', bottom: '0'}" @loadmore ="loadMoreData" :canLoadMore="canLoadMore">
<div class="coming">
    <div class="expected">
        <p>最受期待的电影：</p>
        <h-scroll class="expected-list" @moreExpectList = "moreExpectList" :canLoadMore="canLoadMore">
            <li  class="expected-item" v-for="item in expectedList" :key="item.id"> 
                <img :src="item.img | replaceWH(85, 115)"/>
                    <p class="wish">{{item.wish}}想看</p>
                    <p class="nm">{{item.nm}}</p>
                     <p class="data">{{item.comingTitle}}</p>  
            </li>
        </h-scroll>
    </div>

    <div v-for="(list, key) in comingMap" :key="key">
        <p class="item-date">{{key}}</p>
        <ul>
             <li v-for="item in list" :key="item.id" class="coming-item">
                <div class="item-img">
                    <img :src="item.img">
                </div>
                <div class="item_content">
                    <div class="item_nm">
                        <strong>{{item.nm}}</strong>
                       
                    </div>
                    <p class="item_wish"><em>{{item.wish}}</em>人想看</p>
                    <p class="item_star">主演:{{item.star}}</p>
                    <p class="item_info">{{item.showInfo}}</p>
                </div>
                </li>
        </ul>
    </div>

</div>
</app-content>

<!-- <app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
	<div class="coming">
	  <div class="expected">
        <p>最受期待的电影：</p>
        <h-scroll class="expected-list" @moreExpectList="moreExpectList" :canLoadMore="canLoadMore">
            <li  class="expected-item" v-for="item in expectedList" :key="item.id"> 
                <div class="img">
                	<img :src="item.img | replaceWH(85, 115)"/>
                </div>
                <div class="name">{{item.nm}}</div>
                <p class="time">{{item.comingTitle}}</p>
            </li>
        </h-scroll>
    </div>
		
		
		
	<div v-for="(list, key) in comingMap" :key="key">
            <p class="time-title">{{key}}</p>
            <ul>
                <li v-for="item in list" :key="item.id" class="coming-item">
                   <div class="item-img">
                      <img :src="item.img"/>
                   </div>
        <div class="item-content">
            <div class="nm">
	            <div class="title">{{item.nm}}</div>
	            <span class="version " :class="[{imax: item.version=='v3d imax'},{v3d: item.version=='v3d'}]"></span>
            </div>  
             <div class="sc"><span>{{item.wish}}</span>人想看</div>
            <div class="star">主演：{{item.star}}</div>
            <div class="show-info">{{item.rt}}上映</div>
        </div>
        <div class="btn-ticket">
        	<div class="btn sell" v-if="item.showst==4">
        		<span>预售</span>
        	</div>
        	<div class="btn pre" v-else-if="item.showst==1">
        		<span>想看</span>
        	</div>
        </div>
                </li>
            </ul>
          </div>
       </div>
       </app-content> -->
</template>


 <script>
import "../../utils/filter";
import {getComingList,getMostExpectedData,getMoreComingList,getMoreMostExpectedData} from "../../services/movieService";
import { mapState } from "vuex";
export default {
  data() {
    return {
      comingMap: {},
      morecomingMap:[],
      comingIDS:[],
      canLoadMore: true,
      expectedList: [],
      num:0
    };
  },
  computed: {
    ...mapState(["cityID"])
  },
  watch: {
    cityID() {
      this.initData();
    }
  },
  methods: {
    initData() {
      getComingList(this.cityID).then(result => {
        this.comingMap = result;
      });
   
      //请求更多数据
      // getMostExpectedData(this.cityID).then(result => {
      //   this.expectedList = result;
      // });
    },
       moreExpectList(){
          this.num += 10;
            console.log(this.num);

          getMoreMostExpectedData(this.num).then((result)=>{
            this.expectedList = this.expectedList.concat(...result);
            // console.log(this.num);
          });
      },
    loadMoreData(){
            //取出ids
            let ids = [...this.comingIDS];
            ids = ids.splice(this.initData.length, 10);
            //组装ids
            let comingIDS = ids.join(',');
            // 发送请求
            this.canLoadMore = false;
            console.log(comingIDS);
            getMoreComingList(comingIDS).then(result=>{
              console.log(result);
              this.initData = [...this.initData, ...result];
              console.log(this.initData);
              result.map(item => {
                   console.log(item)
		          if (!this.morecomingMap[item.comingTitle]) {
		            this.morecomingMap[item.comingTitle] = [];
		          }
              this.morecomingMap[item.comingTitle].push(item);
           
            });
            console.log(result);
		        this.comingMap = Object.assign({},this.comingMap, this.morecomingMap);
               if(this.morecomingMap.length >= this.comingIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
            })
            	
           
        }
  },
  created() {
      getComingList(this.cityID).then(({dataResult,data,ids})=>{
        	this.initData=dataResult;
            this.comingMap = data;
            this.comingIDS = ids;
        })

        getMostExpectedData().then(result=>{
          this.expectedList = result;
          console.log(result);
        })
  }
};
</script>

<style lang="scss" scoped>
.coming {
  font-size: 16px;
  .item-date {
    padding-left: 10px;
    padding-top: 10px;
  }
  .item_date {
    padding-top: 10px;
    padding-left: 10px;
  }
  .coming-item {
    display: flex;
    padding: 10px;
    font-size: 16px;
    color: #666;
    border-bottom: 1px solid #e6e6ee;
    .item-img {
      width: 64px;
      img {
        width: 100%;
      }
    }
    // .item_nm{

    // }
    .item_content {
      flex: 1;
      padding-left: 10px;
      .item_wish {
        padding-top: 5px;
        em {
          color: orange;
        }
      }
      .item_info {
        font-size: 13px;
      }
    }
    .item_star {
      font-size: 14px;
      padding-top: 5px;
    }
  }
}
.expected {
  padding: 10px 15px;
  font-size: 16px;

  .expected-item {
    display: inline-block;
    width: 85px;
    height: 115px;
    // overflow: hidden;
    position: relative;
    padding: 5px;
    margin-bottom: 40px;
    img {
      width: 100%;
      height: 100%;
      padding: 5px;
    }
    .wish {
      position: absolute;
      bottom: 0;
      color: orange;
      font-size: 13px;
      width: 100%;
      text-align: center;
      // background: black;
    }
    .nm {
      width: 100%;
      // text-align: center;
      position: absolute;
      bottom: -25px;
      z-index: 22222;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 0 6px 3px;
      font-size: 13px;
      color: #222;
    }
    .data{
       position: absolute;
      bottom: -42px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
<template>
<div id="search" class="page subpage">
           <app-header title="猫眼电影">
               <span slot="left" @click="backAction()"  class="backArow">&lt;</span>
           </app-header>
    <app-content :style="{top:'44px',bottom:0}">
        <div class="search-header">
            <div class="input-wrapper">
                <img class="search-icon" src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/search.png" alt="">
                <input class="search-input" type="text" placeholder="搜电影、搜影院" v-model="value">
                <img class="del-input" style="display:none" src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/close.png" alt="">
            </div>
            <div class="cancel" @click="backAction()">取消</div>
        </div>
        <!-- <div class="search-history">
            <div class="history-item" data-index="0">
                <span class="history-icon"></span>
                <div class="word one-line" v-for="item in moviesList" :key="item.id">
                    {{item.nm}}
                </div>
                <div class="del-word"></div>
            </div>


        </div> -->

        <div class="result">
          

           
                <h3>电影/电视剧/综艺</h3>
                <div class="list" v-for="item in moviesList" :key="item.id">
                  <div class="img">
                      <img :src="item.img | replaceWH(85, 115)" alt=""> 

                  </div>
                  <div class="info">
                    <div class="name-score">
                        <p class="name">
                            <span class="item_nm">{{item.nm}} </span> 
                            <span class="version" :class="{version:item.version}" v-if="item.version=='v3d imax'">
                              <img src="../../assets/3Dimx.png" />
                            </span> 
                            <span class="version" :class="{version:item.version}" v-if="item.version=='v3d'">
                              <img src="../../assets/3D.png" />
                            </span> 
                            <span class="version" :class="{version:item.version}" v-if="item.version=='v2d imax'">
                              <img src="../../assets/2Dimx.png" />
                            </span>
                            <span class="version" :class="{version:item.version}" v-if="item.version=='v2d'">
                              <img src="../../assets/2Dimx.png" />
                            </span>
                        </p>
                        <span class="score">
                            <span class="num" v-if="item.sc != 0">{{item.sc}}分</span>
                          
                        </span>
                    </div>
                    <div class="detail-section">
                      <div class="detail-items">
                        <p>{{item.enm}}</p>
                        <p>{{item.cat}}</p>
                        <p>{{item.rt}}</p>
                      </div>
               
                  </div>
                </div>
            </div>
           
        </div>
        <div class="result cinema">
                <h3>影院</h3>
                <div class="list" v-for="item in cinemaList" :key="item.id">
                    <div class="cinema">
                        <div class="info">
                            <div class="name-price">
                                <span class="name one-line">{{item.nm}}</span>
                                <span class="sell-price">
                                    <span class="price">{{item.sellPrice}}</span>
                                    元起
                              </span>
                            </div>
                            <p class="address one-line">{{item.addr}}</p>
                            <p class="feature-tags">
                                <span class="sell" v-if="item.sell == true">座</span>
                                <span class="son"  v-if="item.hallType == 0">儿童厅</span>
                                <span class="featrue" v-if="item.vipDesc">小吃</span>
                                <span class="featrue">折扣卡</span>
                           </p>
                        </div>
                        <div class="distance">
                            {{item.distance}}
                        </div>
                    </div>
                    
                </div>
        </div>

        <!-- <div class="hot-search">
            <h3>热门搜索</h3>
            <div class="hot-movies-wrap"></div>
        </div> -->
    </app-content>
   
</div>
</template>

<script>
import { getSearchMovie } from "../../services/appService";
export default {
  data() {
    return {
      value: "",
      moviesList: [],
      cinemaList: []
    };
  },
  props: {
    type: Array
  },
  created() {
    console.log("搜索页面加载了");
    console.log(this.type);
  },
  methods: {
    backAction() {
      this.$router.back();
    }
  },
  watch: {
    value: function(value) {
      //   console.log(value);
      getSearchMovie(this.value).then(result => {
        // console.log(result);
        
        //有电影无电影院
        if (result.movies && !result.cinemas) {
          this.moviesList = result.movies.list;
          console.log(this.moviesList);
        } else 
            //既有电影也有电影院
        if (result.cinemas && result.movies) {
          this.moviesList = result.movies.list;
          this.cinemaList = result.cinemas.list;
          console.log(this.moviesList);
          console.log(this.cinemaList.list);

        }

        // else{
        //     this.cinemaList = result.cinemas;
        //     console.log(this.cinemaList);

        // }
      });



    }
  }
};
</script>

<style lang="scss" scoped>
#search {
  background: #eee;
  .backArow {
    font-size: 30px;
  }
  .search-header {
    display: flex;
    align-items: center;
    padding: 8px 0 8px 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    z-index: 1;
    .input-wrapper {
      padding: 0 10px;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
      background-color: #fff;
      flex-grow: 1;

      .search-icon {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        float: left;
        position: relative;
        top: 6px;
      }
      .search-input {
        flex: 1;
        border: none;
        font-size: 13px;
        color: #333;
        line-height: 20px;
        padding: 4px 0;
        width: calc(100% - 40px);
        outline: none;
      }
      .del-input {
        width: 15px;
        height: 15px;
        position: relative;
        float: right;
        top: 6px;
      }
    }
    .cancel {
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      font-size: 16px;
      color: #f03d37;
    }
  }
  .search-history {
    display: flex;
    line-height: 44px;
    align-items: center;
    background: #fff;
    .history-item {
      width: 100%;
      display: flex;
      margin-left: 15px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
    }
    .history-icon {
      width: 15px;
      height: 15px;
      margin-right: 15px;
      background: url("../../assets/history.png") no-repeat;
      background-size: contain;
      display: inline-block;
      -webkit-box-flex: 0;
      flex: 0 0 auto;
    }
    .word {
      color: #333;
      font-size: 15px;
      flex: 1 1 auto;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .del-word {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR…v+VAP6fgcR52Wwyy7LcuJlWTZEqeFjf3dUFEUfF32GxvVumtjRa2eCUPQAAAAASUVORK5CYII=);
      background-repeat: no-repeat;
      background-position: 15px;
      background-size: 10px;
      align-self: center;
      padding: 17px 15px;
      width: 10px;
      height: 10px;
      flex: 0 0 auto;
    }
  }
  .result {
    margin-bottom: 10px;
    background-color: #fff;
    h3{
          font-size: 15px;
          color: #999;
          padding: 9px 15px;
    }
    .list{
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      display: flex;
      padding: 10px;
      .img{
             width: 64px;
            height: 90px;
            // background-color: lawngreen;
            
        img{
            width: 100%;
            height: 100%;
            float: left;
            margin-right: 10px;
        }
      }
      .info{
          margin-left: 10px;
          font-size: 13px;
          color: #666;
          margin-top: 2px;
          flex: 1;
          width: 200px;
          .name-score{
                    font-size: 16px;
                    color: #222;
                    display: -webkit-box;
                    display: flex;
                    -webkit-box-pack: justify;
                    justify-content: space-between;
                    margin-bottom: 2px;
                    .name{
                        display: flex;
                        flex: 1;
                        align-items: center;
                        img{
                          width: 60%;
                        }
                    .item_nm{
                      display: inline-block;
                      width: 50%;
                      font-weight: 700;
                      font-size: 17px;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                    }
                    .version{
                          background-size: contain;
                          background-repeat: no-repeat;
                          height: 14px;
                          // margin-left: 5px;
                          display: inline-block;
                    }
                    }
            .score{
                color: #fa0;
                font-size: 15px;
                flex-shrink: 0;
                padding-left: 5px;
            }
          }
        }
    }
    
  }
  .result.cinema{
    // padding: 15px 15px 15px 0;
    .one-line{
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
    }
      .list{

        .cinema{
          display: flex;
          justify-content: space-around;
          .info{
            flex: 1;
            width: 225px;
            // background: lavender;
            .name-price{
              display: flex;
                .name{
                    font-size: 16px;
                    color: #000;
                }
                .sell-price{
                  font-size: 11px;
                  color: #999;
                  white-space: nowrap;
                  margin-left: 10px;
                  .price{
                        font-size: 17px;
                        color: #ef4238;
                  }
                }
            }
                .feature-tags{
                    .sell,.son{
                            border: 1px solid #589daf;
                            color: #589daf;
                            position: relative;
                            display: inline-block;
                            padding: 0 3px;
                            height: 15px;
                            line-height: 15px;
                            border-radius: 2px;
                            font-size: .6rem;
                            margin-right: 5px;
                    }
                    .featrue{
                            color: #f90;
                            border-color: #f90;
                            border: 1px solid #f90;
                            position: relative;
                            display: inline-block;
                            padding: 0 3px;
                            height: 15px;
                            line-height: 15px;
                            border-radius: 2px;
                            font-size: .6rem;
                            margin-right: 5px;

                    }

                }
          }
          .distance{
              width: 75px;
              align-self: center;
              font-size: 13px;
              color: #999;
          }
        }
      }
  }
  // .hot-search {
  //   padding: 0 0 8px 15px;
  //   background-color: #fff;
  //   top: -1px;
  //   h3 {
  //     border-top: 1px solid #e5e5e5;
  //     padding-top: 17px;
  //     font-size: 15px;
  //     color: #666;
  //   }
  //   .hot-movies-wrap {
  //     margin-top: 15px;
  //     padding-right: 15px;
  //     overflow: hidden;
  //   }
  // }
}
</style>


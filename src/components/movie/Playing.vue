<template>
<app-content :style="{top: '88px', bottom: '0'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
<ul class="playing">
    <li class="playing-item" v-for="item in playingList" :key="item.id">
        <div class="item-img">
            <img :src="item.img"/>
        </div>
        <div class="item-content">
            <div class="movie_title">
                <span class="item-nm">{{item.nm}}</span>
                <span class="version" v-if="item.version =='v3d imax'" >
                    <img src="../../assets/3Dimx.png" />
                </span>
                <span class="version" v-if="item.version == 'v3d'">
                    <img src="../../assets/3D.png" />
                </span>
                <span class="version" v-if="item.version == 'v2d'">
                    <img src="../../assets/2Dimx.png" />
                </span>
            </div>
            <p v-if="item.sc!=0" class="score">
                <em>观众评:</em> {{item.sc}}
            </p>
            <p v-if="item.sc ==0" class="score">
                <em>暂无评分</em>
            </p>
            <p class="line-ellipsis">{{item.star}}</p>
            <p class="line-ellipsis">{{item.showInfo}}</p>
        </div>
    </li>
</ul>
</app-content>
</template>

<script>
import {getPlayingList, getMorePlayingList} from '../../services/movieService'
export default {
    data(){
        return {
            playingList: [],
            playingIDS: [],
            canLoadMore: true
        }
    },
    methods: {
        //加载更多数据
        loadMoreData(){
            console.log('执行加载更多');
            //取出ids
            let ids = [...this.playingIDS];
            // console.log(ids);
            ids = ids.splice(this.playingList.length, 10);
            //组装ids
            let movieIds = ids.join(',');
            // 发送请求
            this.canLoadMore = false;
            getMorePlayingList(movieIds).then(result=>{
            this.playingList = [...this.playingList, ...result];
               
                if(this.playingList.length >= this.playingIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
            })
        }
    },
    created(){
        //初始化请求数据
        getPlayingList().then(({data, ids})=>{
            this.playingList = data;
            this.playingIDS = ids;
        })
    }
}
</script>

<style lang="scss" scoped>
.line-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.playing-item{
    display: flex;
    padding: 10px;
    .item-img{
        width: 64px;
        img{
            width: 100%;
        }
    }
    .item-content{
        flex: 1;
        margin-left: 5px;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 5px;
        padding-right: 5px;
        margin-right: 48px;
        overflow: hidden;
        .movie_title{
            display: flex;
            align-items: center;
            .version{
                height: 14px;
                img{
                    height: 100%;
                }
            }
        }
        em{
            font-style: normal;
            color: #666;
        }
        .item-nm{
            font-weight: bolder;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding-right: 5px;
        }
        .score{
            font-size: 14px;
            color: #faaf00;
        }
        p{
            font-size: 13px;
            color: #666;
            line-height: 20px;
        }
    }
}
</style>


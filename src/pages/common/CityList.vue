<template>
<div id="city-list" class="page subpage">
    <app-content :style="{top: 0, bottom: 0}" ref="content">
        <p>定位城市</p>
        <div class="location part">
        <input type="button" value="点击定位">

        </div>
        <p>
            最近访问城市
        </p>
       
        <div class="lately_city part">
                <input type="button" value="鞍山">
                <input type="button" value="上海">
                <input type="button" value="深圳">
        </div>

         <p>热门城市</p>
         <div class="city_title" >
           
                 <button v-for="(item,index) in cityList" :key="index" @click="selectCityAction(item)">{{item.nm}}</button>
         </div>
        <div v-for="cityMap in data" :key="cityMap.key" ref="list">
            <h6 class="letter">{{cityMap.key}}</h6>
            <ul class="city-list-block">
                <li class="city_item" v-for="item in cityMap.value" :key="item.id"
                    @click="selectCityAction(item)">
                    {{item.nm}}
                </li>
            </ul>
        </div>
    </app-content>
    <nav class="nav-bar">
        <li class="nav-item" v-for="(item, index) in keys" :key="item" @click="btnAction(index)">
            {{item}}
        </li>
    </nav>
</div>

</template>

<script>
import {getCityListData} from '../../services/appService'
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            data: [],
            keys: [],
            // cityList:['上海','北京','广州','深圳','武汉','天津','西安','南京','杭州','成都','重庆'],
            cityList:[{id:10,nm:'上海'},{id:1,nm:'北京'},{id:20,nm:'广州'},{id:30,nm:'深圳'},{id:57,nm:'武汉'},
            {id:40,nm:'天津'},{id:42,nm:'西安'},{id:55,nm:'南京'},{id:50,nm:'杭州'},{id:59,nm:'成都'},{id:45,nm:'重庆'}]
        }
    },
    methods: {
        ...mapActions(['selectCity']),
        btnAction(index){
            let height = 0;
            for(let i = 0; i < index; i++){
                height += this.$refs.list[i].offsetHeight;
            }     
            this.$refs.content.scrollTo(height);
        },
        selectCityAction(item){
            // console.log(item)
            //将选中的城市保存，保存到全局数据中
            this.selectCity({
                city: item.nm,
                id: item.id
            })

            // 返回上一页
            this.$router.back();
        }
        // CityAction(index){
        //     let tmpCity = this.cityList[index];
        //     console.log(tmpCity);
        //     this.$store.state.city = tmpCity;
        //      this.$store.state.cityID = tmpCity;
        //     this.$router.back();

        // }
    },
    created(){
        getCityListData().then(({data, keys})=>{
            this.data = data;
            this.keys = keys;
        })
    }
}
</script>

<style lang="scss" scoped>
#city-list{
    background: #eee;
    p{
        padding: 10px;
        font-size: 14px;
    }
    .part{
        width: 100%;
        height: 50px;
        background: #f5f5f5;
        input{
            padding: 5px 20px;
            margin-left: 4%;
            margin-top: 10px;
            border: 1px solid #e6e6e6;
            outline: 0;
        }
    }
    .city_title{
        width: 100%;
        // padding:10px;
        background: #f5f5f5;
           button{
               width: 20%;
            padding: 5px 15px;
            margin-left: 4%;
            margin-top: 10px;
            border: 1px solid #e6e6e6;
            outline: 0;
        
        }

    }
    .letter{
        padding-left: 25px;
        line-height: 30px;
    }
    .city-list-block{
            background-color: #f5f5f5;
    }
    .city_item{
        height: 44px;
        line-height: 44px;
        margin-left: 15px;
        border-bottom: 1px solid #c8c7cc;
    }

}
.nav-bar{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    .nav-item{
        font-size: 14px;
        padding: 0 6px;
    }
}
</style>


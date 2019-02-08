<template>
    <div class="page subpage" id="login">
        <app-header title="猫眼电影">
            <span slot="left" @click="backAction()" class="backArow">&lt;</span>
            </app-header>
            <header class="sub-header">
                <nav class="nav">
                    <li v-for="(item,index) in navList" :key="index" :class="{active:navIndex == index}" @click="navAction(index)">
                        {{item}}
                    </li>    
                    
                </nav>
               
            </header>
            <app-content v-if="navIndex==0" :style="{top:'100px',bottom:'0'}">
                <p>
                    <input type="text" placeholder="账号名"> 
                </p>
                <p>
                    <input type="text" placeholder="请输入您的密码"> 
                </p>
                <button>登录</button>


            </app-content>

            <app-content v-if="navIndex == 1" :style="{top:'100px',bottom:'0'}">
                <p>
                    <input type="text" placeholder="请输入手机号"> 
                </p>
                <p>
                    <input type="text" placeholder="请输入短信验证码"> 
                </p>
                <button>登录</button>


            </app-content>

           
    </div>
</template>

<script>
export default {
    data(){
        return{
            navList:['美团账号登录','手机验证登录'],
            navIndex:0
        }
    },
    methods:{
        backAction(){
            this.$router.back();
            
        },
        navAction(index){
            this.navIndex = index;
        }
    },

   
}
</script>

<style lang="scss" scoped>
#login{
    background: #eeeeee;
    .backArow{
        font-size: 30px;
    }
      input{
            width: 100%;
            height: 30px;
            border: 0;
            border-bottom: 1px solid #cccccc;
            // margin-bottom: 5px;
        }
        button{
            width: 100%;
            height: 50px;
            background: red;
            color: #ffffff;
            outline: none;
            border: 0;
            margin-top: 10px;
        }
}
.subpage{
    bottom: 0;
    .sub-header{
        width: 100%;
        position: absolute;
        top: 44px;
        
        .nav{
            width: 100%;
            display: flex;
            border-bottom: .08rem solid #d6d6d6;
           li{
               flex: 1;
               padding:15px 10px;
               text-align: center;
               &.active{
                   color: red;
                border-bottom: 2px solid #f03d37;

               }
           } 
        }
      
    }
}

</style>


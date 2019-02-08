import http from '../utils/http';
import API from '../api';
//请求电影院数据
export  function getCinemaList(ci){
     return  new Promise((resolve,reject)=>{

        http({
            url:API.CINEMA_LIST_API,
            method:'GET',
            data:{
                ci:ci,
                token:'',
                limit:20
            }
        }) 
        // axios.get('/ajax/cinemaList?day=2018-11-17&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1542435381515&cityId=151')

            .then(({data,status})=>{
              if(status != 200 ){
                //请求失败
                return;
              }
              //请求成功
                // console.log(data.cinemas);
                let Offset = data.paging.offset
                let newData = data.cinemas.map(item=>{
                    let {id,nm,tag,sellPrice,addr,distance,promotion,cardPromotionTag} = item
                    return  {id,nm,tag,sellPrice,addr,distance,promotion,cardPromotionTag};
                })
                // this.cinemasList = data.cinemas;
                resolve(
                    {
                        data:newData,
                        offset:Offset
                    }
                );
            })
            .catch(error=>{
                //请求失败
              console.log(error);
            })
        })
  
}



//请求更多电影院数据
export  function getMoreCinemaList(ci,offset){
    return  new Promise((resolve,reject)=>{

       http({
           url:API.MORE_CINEMA_LIST_API,
           method:'GET',
           data:{
            //    ci:30,
                 ci:ci,
               token:'',
               limit:20,
               offset: offset
           }
       }) 
           .then(({data,status})=>{
             if(status != 200 ){
               //请求失败
               return;
             }
             //请求成功
             console.log(data.cinemas);
               let newData = data.cinemas.map(item=>{
                   let {id,nm,tag,sellPrice,addr,distance,promotion,cardPromotionTag} = item
                   return  {id,nm,tag,sellPrice,addr,distance,promotion,cardPromotionTag};
               })
               // this.cinemasList = data.cinemas;
               resolve(newData);
           })
           .catch(error=>{
               //请求失败
             console.log(error);
           })
       })
 
}

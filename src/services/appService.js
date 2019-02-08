import API from '../api'
import http from '../utils/http'


export function getCityListData(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.CITY_LIST_API,
            method: 'GET'
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
            }else{
                //请求成功
                // 取得首字母，按字母先分类
                let map = {};
                data.cts.map(item=>{
                    let letter = item.py[0];
                    letter = letter.toUpperCase();
                    if(!map[letter]){
                        map[letter] = [];
                    }
                    map[letter].push(item);
                })
                let keys = Object.keys(map);
                //排序
                // 选择排序
                for(let i = 0; i < keys.length; i++){
                    for(let j = i+1; j < keys.length; j++){
                        if(keys[i] > keys[j]){
                            let tmp = keys[i];
                            keys[i] = keys[j];
                            keys[j] = tmp;
                        }
                    }
                }
                //组装数据
                let newData = keys.map(item=>{
                    return {
                        key: item, 
                        value: map[item]
                    }
                })
                resolve({
                    keys: keys,
                    data: newData
                });
            }
        })
        .catch(error=>{
            //请求失败
        })
    })
}


//搜索电影电影院
export function getSearchMovie(kw){
    return new Promise((resolve,reject)=>{
        http({
            url:API.SEARCH_MOVIE_CINEMA_API,
            method:'GET',
            data:{
                kw:kw,
                cityId:30,
                stype:-1
            }

        })
       
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }else{
                resolve(data);
            }
            //请求成功
            console.log(data);
            let newData = data.movies.list.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased};
            })
            resolve({
                data: newData,
            });

           
        })
        .catch((error)=>{
            console.log(error);
        })
    })
}
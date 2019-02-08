//开发环境
const SAT_HOST = 'http://localhost:8080';
//测试
const UAT_HOST = 'http://10.213.12.98:8080';
//生产
const PRO_HOST = 'https://m.maoyan.com';


/*
正在热映的接口
参数： token 用户标识
*/
const PLAYING_API = '/ajax/movieOnInfoList';

/*
更多正在热映数据的接口
参数：
    token 用户标识
    movieIds  请求的电影id
*/
const MORE_PLAYING_API = '/ajax/moreComingList';

/*
最受期待的电影数据接口
参数：ci 城市id
     limit   数据长度
     offset   数据偏移量
     token  用户标识
*/
const MOST_EXPECTED_API = '/ajax/mostExpected';


// 更多最受期待的电影数据接口

const MORE_MOST_EXPECTED_API = '/ajax/mostExpected'

/*
即将上映的接口
参数： ci   城市id
      token   用户标识
      limit   数据长度
*/
const COMING_API = '/ajax/comingList';

/*
更多即将上映的接口
*/
const MORE_COMING_API = '/ajax/moreComingList';
/*
城市列表接口
*/
const CITY_LIST_API = '/dianying/cities.json';



/*
影院接口

*/
const CINEMA_LIST_API = '/ajax/cinemaList';


/*
更多影院接口
*/
const MORE_CINEMA_LIST_API = '/ajax/cinemaList';

//搜索电影电影院
/*
?kw=%E5%93%88%E5%93%88&
cityId=45&
stype=-1
*/
const SEARCH_MOVIE_CINEMA_API = '/ajax/search'

export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    MORE_PLAYING_API,
    MORE_COMING_API,
    MOST_EXPECTED_API,
    MORE_MOST_EXPECTED_API,
    COMING_API,
    CITY_LIST_API,
    CINEMA_LIST_API,
    MORE_CINEMA_LIST_API,
    SEARCH_MOVIE_CINEMA_API
}




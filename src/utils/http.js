import axios from 'axios'
import API from '../api'


export default function http({url, method, data}){
    let options = {
        url: url,
        method: method,
        baseURL: API.SAT_HOST,
        timeout: 5000,
        withCredentials: false
    };

    if(method == 'GET'){
        options.params = data;
    }else if(method == "POST"){
        options.data = data;
    }

    return axios(options);

}
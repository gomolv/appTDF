import axios from 'axios'
const base='http://192.168.1.77:3000'
const headers = {
    "auth": "123",
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive"
}

class Request {
    constructor(url){
        this.url = base + url;
        this.baseURL = base ;
        console.log(this.url)
        this.request = axios.create({  baseURL: this.baseURL, headers})
    }

    async get(){
        return this.request({
            url: this.url
        })
    }

    async  post(value){
        return this.request({
            url: this.url, data: value, method: 'post'
        })
    }

    async put(value){
        return this.request({
            url: this.url, data: value, method: 'put'
        })
    }
}

export default Request;
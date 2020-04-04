<template>
    <div  id="app">
        <div class="content">
            <div class="content-input">
                <input type="text" v-model="search" @keyup="getData" placeholder="请输入搜索内容">
            </div>
            <div class="content-table">
                <table v-if="list.data.length > 0">
                    <thead>
                        <tr>
                            <th>__typename</th>
                            <th>id</th>
                            <th>title</th>
                            <th>login</th>
                            <th>url</th>
                            <th>createdAt</th>
                        </tr>
                    </thead>
                    <tr  v-for=" (item,index) in list.data" :key="index">
                        <td>{{ item.__typename }}</td>
                        <td>{{ item.id ? item.id : '' }}</td>
                        <td>{{ item.title ? item.title : '' }}</td>
                        <td>{{ item.author ? item.author.login : ''}}</td>
                        <td>{{ item.url ? item.url : '' }}</td>
                        <td>{{ item.createdAt ? item.createdAt : ''}}</td>
                    </tr>
                </table>
                <div v-else>
                    暂无匹配数据
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {  getSearchData} from './queries.js';
import config from './config'
import { getUserAccesToken, getUserInfo } from './api'
import { throttle, debounce } from './throttle'
  export default {
    name:'App',
    data(){
        return {
            code:'',
            search:'vue',
            accessToken:'',
            currentPage: 1,
            list:{
                data:[],
                total:0
            },
            user:'',
            userInfo:{},
        }
    },
    created(){
        this.code = window.location.search.split('=')[1]
        this.authoriz_url = config.Oauth_url
        this.authoriz_url += '?client_id=' + config.Client_id
        // let accessToken = sessionStorage.getItem('access_token')
        if (this.code){
            this.init()
        } else {
            window.location.href = this.authoriz_url
        }
        // console.log('query',this.query)
    },
    methods: {
        async init(){
            this.accessToken = await this.getAccesToken()
            this.userInfo = await this.getUserInfo()
            let list = await this.submit()
            // this.user = getUser()
         },
        getAccesToken () {
            let parm = {
                client_id:config.Client_id,
                client_secret:config.Client_secret,
                code:this.code,
            }
            // 获取access_token
            getUserAccesToken(parm).then(res => {
                console.log('token',res.access_token)
                if (res && res.access_token){
                    this.accessToken = res.access_token
                    sessionStorage.setItem('access_token',res.access_token)
                }
            }).catch(err =>{
                console.log(err)
            })
        },
        getUserInfo(){
            let access ={
                access_token: sessionStorage.getItem('access_token')
            } 
             // 当获取code成功后在获取access_token
           getUserInfo(access).then(res => {
               this.userInfo = res
               sessionStorage.setItem('user',res.login)
           }).catch(err => {
               console.log(err)
           })
        },
        submit(){
            let parm = this.search
            getSearchData(parm).then((res) => {
                console.log(res);
                if (res && res.data && res.data.search) {
                    this.list.data = res.data.search.nodes
                } else {
                    this.list.data = []
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        getData(){
            // let fn = this.test()
            throttle(function(){
                console.log('键盘抬起')
            },3000)()
        }
    }
  }
</script>

<style lang="postcss" scoped>
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    .content-input {
      width: 500px;
      margin: 0 auto;
      text-align: center;

      input {
        width: 500px;
        height: 30px;

        /* outline-style: none; */
        border: 1px solid #ccc;
        border-radius: 3px;

        /* border-radius: 5px; */
      }
    }

    .content-table {
      /* width: 900px; */
      margin: 40px;

      table {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
      }

      table td, table th {
        border: 1px solid #cad9ea;
        color: #666;
        height: 30px;
      }

      table thead th {
        background-color: #cce8eb;
        width: 100px;
      }

      table tr:nth-child(odd) {
        background: #fff;
      }

      table tr:nth-child(even) {
        background: #f5fafa;
      }
    }
  }
}
</style>
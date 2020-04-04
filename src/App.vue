<template>
    <div  id="app">
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <div class="bg-purple-light">
                    <div class="bg-purple-light-input">
                        <el-input v-model="search" placeholder="请输入内容">
                            <el-button slot="append" icon="el-icon-search" @click="submit"></el-button>
                        </el-input>
                    </div>
                    <ApolloQuery :query="list">
                        <template slot-scope="{ result: { data } }">
                            <el-table
                                v-if="data"
                                :data="data.search.nodes"
                                border
                                style="width: 100%;">
                                <el-table-column
                                    width="100px"
                                    prop="__typename"
                                    label="typeName">
                                </el-table-column>
                                <el-table-column
                                    prop="id"
                                    label="id">
                                </el-table-column>
                                 <el-table-column
                                    prop="title"
                                    label="title">
                                </el-table-column>
                                <el-table-column
                                    label="author">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.author.login}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="url">
                                    <template slot-scope="scope">
                                        <a :href="scope.row.url">{{scope.row.url}}</a>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="createdAt"
                                    label="createdAt">
                                </el-table-column>
                            </el-table>
                            <!-- <div class="block">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="data.search.issueCount">
                            </el-pagination>
                        </div> -->
                        </template>    
                    </ApolloQuery>
                </div>
            </el-col>
            <!-- <el-col :span="2"><div class="grid-content bg-purple"></div></el-col> -->
        </el-row>
        
    </div>
</template>

<script>
// import gql from 'graphql-tag'
import axios from 'axios'
import {  getSearchData} from './queries.js';
import config from './config'
import { getUserAccesToken, getUserInfo } from './api'
const defaultData = {
    search: 'vue'
}
  export default {
    name:'app',
    data(){
        return {
            code:'',
            search:'',
            accessToken:'',
            currentPage: 1,
            user:'',
            list: getSearchData(defaultData.search),
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
            // this.list = await this.submit()
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
            let user = sessionStorage.getItem('user')
            console.log('$apolloData',this.$apolloData)
            this.list = getSearchData(this.search)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        } 
    }
  }
</script>

<style lang="postcss" scoped>
.app {
  width: 100%;

  .bg-purple-light-input {
    width: 500px;
  }
}
</style>
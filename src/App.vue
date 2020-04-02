<template>
    <div>
        <!-- <el-row>
            <el-button type="primary" class="el-icon-star-on">主要按钮</el-button>
        </el-row> -->
   <div class="app__setings">
      <!-- <UserSearch v-on:search="handleSearchUser"/> -->
      <a :href="authoriz_url">登录</a>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import axios from 'axios'
import {  getUser} from './queries.js';
import config from './config'
import {getAccesToken} from './api'
  export default {
    data(){
        return {
            code:'',
            list:[],
            name:'abc',
           user:{}
        }
    },
    created(){
        this.code = window.location.search.split('=')[1]
        this.authoriz_url = config.Oauth_url
        this.authoriz_url += '?client_id=' + config.Client_id
        // window.location.href = this.authoriz_url
        // console.log('this.$router',this.$route)
        // this.list = searchList(this.name)
        // this.query = getUser().then()
        // let url = config.Oauth_url
        // url+= '?client_id' +config.Client_id
        this.getAccesTok()
        
    },
    mounted(){
        // console.log(window.location.search)
    },
    methods: {
        getAccesTok(){
            let parm = {
                client_id:config.Client_id,
                client_secret:config.Client_secret,
                code:this.code,
            }
            getAccesToken(parm).then(res => {
            console.log('res',res)
        })
        }
    }
  }
</script>

<style lang="postcss" scoped>
div {
  color: red;
}
</style>
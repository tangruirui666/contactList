<template>
  <div></div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
       return{

       }
    },
    created(){
        //并发请求，同时进行多个请求，并统一处理返回值
        axios.all([
            axios.get('/data.json'),
            axios.get('/site.json')
        ]).then(axios.spread((dataRes,siteRes)=>{
            console.log(dataRes,siteRes)
        }))
    },

}
</script>

<style></style>

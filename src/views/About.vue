<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "about",
  created() {
    //get请求的两种方法
    axios
      .get("/data.json", {
        params: {
          id: 10
        }
      })
      .then(res => {
        console.log(res);
      });
    axios({
      url: "/data.json",
      method: "get",
      params: {
        id: 20
      }
    }).then(res => {
      console.log(res);
    });
    //post请求的方式，请求的data有两种格式，applicition/json form-data
    //1.applicition/json
    let data = { id: 12 };
    axios.post("/post", data).then(res => {
      console.log(res);
    });
    axios({
      method: "post",
      url: "/post",
      data: data
    }).then(res => {
      console.log(res);
    });
    axios.post("post", { params: { id: 299 } }).then(res => {
      console.log(res);
    });
    // 2.form-data格式
    //创建一个from-data格式的对象
    let formdata = new FormData();
    for (let key in data) {
      formdata.append(key, data[key]);
    }
    axios.post("/post", formdata).tnen(res => {
      console.log(res);
    });
    //post、put、patch请求方式中的data都有form-data格式和aplicition/json
  }
};
</script>
<style lang="less" scoped></style>

<template>
  <div>
    <!-- 联系人列表 -->
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";

import { ContactList, Toast, ContactEdit, Popup } from "vant";
export default {
  name: "contactList",
  //   toast不需要注册,因为没有在template中使用
  components: {
    [ContactList.name]: ContactList,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup
  },
  data() {
    return {
      list: [],
      instance: null, //axios实例
      showEdit: false, //编辑弹窗的显隐
      editingContact: {}, //正在编辑的联系人数据
      isEdit: false //默认是新建，控制是新建还是编辑
    };
  },
  created() {
    this.instance = axios.create({
      baseURL: "http://localhost:9000/api"
    });
    this.getUseList();
  },
  methods: {
    getUseList() {
       console.log(this.instance.get('/contactList'))
      this.instance
        .get("/contactList")
        .then(res => {
          //   console.log(res);
          this.list = res.data.data;
        })
        .catch(err => {
          Toast("请求失败，请稍后重试");
        });
    },
    //   新增联系人
    onAdd() {
      //点击之后，编辑弹窗打开
      this.showEdit = true;
      //新建状态
      this.isEdit = false;
    },
    //编辑联系人
    onEdit(item) {
      this.showEdit = true;
      //编辑状态
      this.isEdit = true;
      //获取页面上输入的item,并且赋值到editingContact
      this.editingContact = item;
    },
    //保存联系人
    onSave(info) {
      if (this.isEdit) {
        //编辑
        this.instance.put('/contact/edit',info).then(res=>{
            if(res.data.code===200){
                Toast('编辑成功')
                this.showEdit=false;
                this.getUseList()
            }
        }).catch(()=>{Toast('请求失败，请稍后重试')})
      } else {
        //新建
        console.log("9999");
        console.log(info);
        this.instance
          .post("/contact/new/json", info)
          .then(res => {
            if (res.data.code === 200) {
              Toast("新建成功");
              this.showEdit = false;
              this.getUseList();
            }
          })
          .catch(() => {
            Toast("请求失败,请稍后重试");
          });
      }
    },
    //删除联系人
    onDelete(info) {
        console.log(info)
        this.instance.delete('/contact',{params:{id:info.id}}).then(res=>{
            if(res.data.code===200){
                Toast('删除成功')
                this.showEdit=false
                this.getUseList()
            }
        }).catch(()=>{
            Toast('删除失败，请稍后重试')
        })
    }
  }
};
</script>

<style></style>

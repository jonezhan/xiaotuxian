// 管理用户数据相关

import { loginAPI } from "@/apis/user";

import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    // 1.定义管理用户数据的state
    const userInfo = ref({});

    //   2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };

    //   以对象的形式返回state和action
    return {
      userInfo,
      getUserInfo,
    };
  },
  {
    persist: true,
  }
);

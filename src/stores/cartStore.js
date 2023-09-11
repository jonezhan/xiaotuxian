import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { delCartAPI, findNewCartListAPI, insertCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);

    // 1.定义state - cartList
    const cartList = ref([]);

    // 获取最新购物车列表 - action
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };

    // 2.定义action - addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        // 登录之后的加入购物车逻辑
        await insertCartAPI({ skuId, count });
        updateNewList();
      } else {
        // 添加到购物车逻辑
        // 已经添加过 --+count
        // 没有添加过 --直接push到cartList
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          // 找到了加数量
          item.count += goods.count;
          ElMessage;
        } else {
          // 没找到
          cartList.value.push(goods);
        }
      }
    };

    // 删除购物车逻辑
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 登录之后的加入购物车逻辑
        await delCartAPI([skuId]);
        updateNewList();
      } else {
        // 思路：
        // 1.找到要删除项的下标值 - Splice
        const idx = cartList.value.findIndex((item) => item.skuId === skuId);
        cartList.value.splice(idx, 1);

        // 2.使用数组的过滤方法 - filter
      }
    };

    // 清除购物车
    const clearCart = () => {
      cartList.value = [];
    };

    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项， 把selected改为传入的selected
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 全选功能
    const allCheck = (selected) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 计算属性
    // 1. 总的数量 所有项的count之和
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );

    // 2.总价 所有项的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );

    // 3.已选择的数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );

    // 4.已选择的商品价格合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    return {
      cartList,
      addCart,
      delCart,
      clearCart,
      singleCheck,
      allCheck,
      updateNewList,
      isAll,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice,
    };
  },
  {
    persist: true,
  }
);

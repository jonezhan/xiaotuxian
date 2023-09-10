import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    // 1.定义state - cartList
    const cartList = ref([]);

    // 2.定义action - addCart
    const addCart = (goods) => {
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
    };

    return {
      cartList,
      addCart,
    };
  },
  {
    persist: true,
  }
);

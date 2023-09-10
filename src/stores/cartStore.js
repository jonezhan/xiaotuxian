import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

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

    // 删除购物车逻辑
    const delCart = (skuId) => {
      // 思路：
      // 1.找到要删除项的下标值 - Splice
      const idx = cartList.value.findIndex((item) => item.skuId === skuId);
      cartList.value.splice(idx, 1);

      // 2.使用数组的过滤方法 - filter
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

    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
    };
  },
  {
    persist: true,
  }
);

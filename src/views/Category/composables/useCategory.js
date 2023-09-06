import { getCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export function useCategory() {
  // 获取分类数据
  const categoryData = ref({});
  const route = useRoute();
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryData.value = res.result;
  };
  onMounted(() => getCategory());

  // <!-- 解决路由缓存问题2 -->
  // 目标：路由参数变化时 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // 应该使用最新的路由参数请求最新的分类数据 通过to获得相关数据
    getCategory(to.params.id);
  });

  return {
    categoryData,
  };
}

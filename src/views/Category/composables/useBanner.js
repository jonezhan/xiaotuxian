import { getBannerAPI } from "@/apis/home";
import { onMounted, ref } from "vue";

export function useBanner() {
  // 获取轮播图数据
  const bannerList = ref([]);
  const getbanner = async () => {
    const res = await getBannerAPI({
      distributionSite: "2",
    });
    bannerList.value = res.result;
  };
  onMounted(() => getbanner());

  return { bannerList };
}

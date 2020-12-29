import request_node from "@/utils/request_node"

// 轮播图
export const getHomeBanners = () => {
  return request_node({
    url: "/config/banner?type=home_banner&platform=flutter",
    method: "GET"
  })
}
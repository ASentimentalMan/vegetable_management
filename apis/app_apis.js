import request_java from "@/utils/request_java"

// 行政区域列表
export const getLocationListApi = payload => {
  return request_java({
    url: "/params/region/city-one",
    data: payload,
    method: "GET"
  })
}

// 农产品（蔬菜、水果） 列表
export const getCatesApi = payload => {
  return request_java({
    url: "/params/dict-data/vegetable-agricultural-products",
    data: payload,
    method: "GET"
  })
}
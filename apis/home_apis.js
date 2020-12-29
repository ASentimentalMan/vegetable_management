import request_php from "@/utils/request_php"

// 新闻列表
export const getNewsListApi = payload => {
  return request_php({
    url: "/article/article_list",
    method: "GET",
    data: payload
  })
}

// 新闻列表
export const getNewsDetailApi = payload => {
  return request_php({
    url: "/article/article_show",
    method: "GET",
    data: payload
  })
}
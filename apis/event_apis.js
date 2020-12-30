import request_java from "@/utils/request_java"

// 业务清单
export const getEventListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-my-page",
    // contentType: "application/json",
    data: payload,
    token: true
  })
}

// 新增业务
export const createEventApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 业务合同清单
export const getContractListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-contract-page",
    data: payload,
    token: true
  })
}

// 新增业务合同
export const createContractApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-contract",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 业务发票清单
export const getReceiptListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-invoice-my-page",
    data: payload,
    token: true
  })
}

// 业务物流清单
export const getExpressListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-logistics-page",
    data: payload,
    token: true
  })
}

// 业务会议清单
export const getMeetingListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-logistics-page",
    data: payload,
    token: true
  })
}

// 业务采购清单
export const getOrderListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-logistics-page",
    data: payload,
    token: true
  })
}

// 业务销售清单
export const getSaleListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-logistics-page",
    data: payload,
    token: true
  })
}
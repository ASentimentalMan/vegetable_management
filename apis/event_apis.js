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

// 新增物流单
export const createExpressApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-logistics",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 业务会议清单
export const getMeetingListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-meeting-my-page",
    data: payload,
    token: true
  })
}

// 新增会议单
export const createMeetingApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-meeting",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 业务采购清单
export const getOrderListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-procure-my-page",
    data: payload,
    token: true
  })
}

// 新增采购单
export const createOrderApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-procure",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 业务销售清单
export const getSaleListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-sales-my-page",
    data: payload,
    token: true
  })
}

// 新增销售单
export const createSaleApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-sales",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 客户清单
export const getCompanyListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/customer-page",
    data: payload,
    token: true
  })
}

// 新增客户
export const createCustomerApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/customer",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 发票类型列表
export const getReceiptTypeListApi = () => {
  return request_java({
    method: "GET",
    url: "/params/dict-data/sys-invoice-type"
  })
}

// 客户类型列表
export const getCustomerTypeListApi = () => {
  return request_java({
    method: "GET",
    url: "/params/dict-data/sys-customer-type"
  })
}

// 客户来源列表
export const getCustomerSourceListApi = () => {
  return request_java({
    method: "GET",
    url: "/params/dict-data/sys-customer-source"
  })
}

// 客户等级列表
export const getCustomerLevelListApi = () => {
  return request_java({
    method: "GET",
    url: "/params/dict-data/sys-customer-level"
  })
}

// 客户行业列表
export const getCustomerIndustryListApi = () => {
  return request_java({
    method: "GET",
    url: "/params/dict-data/sys-customer-industry"
  })
}
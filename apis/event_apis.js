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

// 修改业务
export const editEventApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/business",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除业务
export const deleteEventApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/business",
    data: payload,
    token: true
  })
}

// 业务统计
export const getEventCountApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-count",
    data: payload,
    token: true
  })
}

// 合同清单
export const getContractListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-contract-page",
    data: payload,
    token: true
  })
}

// 新增合同
export const createContractApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-contract",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 修改合同
export const editContractApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/business-contract",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除合同
export const deleteContractApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/business-contract",
    data: payload,
    token: true
  })
}

// 发票清单
export const getReceiptListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-invoice-my-page",
    data: payload,
    token: true
  })
}

// 新增发票
export const createReceiptApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-invoice",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 修改发票
export const editReceiptApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/business-invoice",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除发票
export const deleteReceiptApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/business-invoice",
    data: payload,
    token: true
  })
}

// 物流清单
export const getExpressListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-logistics-page",
    data: payload,
    token: true
  })
}

// 新增物流
export const createExpressApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-logistics",
    contentType: "application/json",
    data: payload,
    token: true
  })
}


// 修改物流
export const editExpressApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/business-logistics",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除物流
export const deleteExpressApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/business-logistics",
    data: payload,
    token: true
  })
}

// 会议清单
export const getMeetingListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-meeting-my-page",
    data: payload,
    token: true
  })
}

// 新增会议
export const createMeetingApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-meeting",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 修改会议
export const editMeetingApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/business-meeting",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除会议
export const deleteMeetingApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/business-meeting",
    data: payload,
    token: true
  })
}

// 采购清单
export const getOrderListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-procure-my-page",
    data: payload,
    token: true
  })
}

// 新增采购
export const createOrderApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-procure",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 修改采购
export const editOrderApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/business-procure",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除采购
export const deleteOrderApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/business-procure",
    data: payload,
    token: true
  })
}

// 销售清单
export const getSaleListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-sales-my-page",
    data: payload,
    token: true
  })
}

// 新增销售
export const createSaleApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-sales",
    contentType: "application/json",
    data: payload,
    token: true
  })
}


// 修改销售
export const editSaleApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/business-sales",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除销售
export const deleteSaleApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/business-sales",
    data: payload,
    token: true
  })
}

// 客户清单
export const getCustomerListApi = payload => {
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

// 修改客户
export const editCustomerApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/customer",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除客户
export const deleteCustomerApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/customer",
    data: payload,
    token: true
  })
}

// 收款清单
export const getReceivePaymentListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-fund-receive-my-page",
    data: payload,
    token: true
  })
}

// 新增收款
export const createReceivePaymentApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-fund-receive",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 修改收款
export const editReceivePaymentApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/business-fund-receive",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除收款
export const deleteReceivePaymentApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/business-fund-receive",
    data: payload,
    token: true
  })
}

// 付款清单
export const getPaymentListApi = payload => {
  return request_java({
    method: "GET",
    url: "/info/business-fund-payment-my-page",
    data: payload,
    token: true
  })
}

// 新增付款
export const createPaymentApi = payload => {
  return request_java({
    method: "POST",
    url: "/info/business-fund-payment",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 修改付款
export const editPaymentApi = payload => {
  return request_java({
    method: "PUT",
    url: "/info/business-fund-payment",
    contentType: "application/json",
    data: payload,
    token: true
  })
}

// 删除付款
export const deletePaymentApi = payload => {
  return request_java({
    method: "DELETE",
    url: "/info/business-fund-payment",
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
// 数组中查找包含键指定值对的对象
const findObjectInArrayWithKey = (key, value, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i]
    }
  }
  return null;
}

// 对象转换成GET的Query
const toQuery = (key, value) => {
  if (typeof value == "undefined") {
    return `&${key}=`;
  }
  return `&${key}=${value}`;
}

const objectToQuery = (obj) => {
  if (typeof obj !== 'object') {
    return "";
  }
  let query = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      query += toQuery(key, value);
    }
  }
  return query
}

export { findObjectInArrayWithKey, objectToQuery } 
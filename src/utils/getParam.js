/*
  计算表单参数的方法
 */
const getParam = (attrs, data) => {
  const params = {}
  let item;
  attrs.forEach((attr) => {
    if (attr instanceof Array) { // 如果需要计算, 则atrr是一个数组[string, function]
      item = data[attr[0]]
      if (item) params[attr[0]] = attr[1](item)
    } else {
      item = data[attr]
      if (item) params[attr] = item
    }
  })

  return params
}

export default getParam;

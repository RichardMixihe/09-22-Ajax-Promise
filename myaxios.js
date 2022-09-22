function myaxios({ method, url, params, data }) {
  let p = new Promise((resolve, reject) => {
    // 这里放异步任务【并且把成功的结果传递给resolve；把失败的结果传递给reject】
    // 1. 处理params参数【把对象格式转成查询字符串】
    let arr = []
    for (let key in params) {
      // key === id | appkey
      // params[key] === 100 | laotang
      // console.log(params[key]) // key是变量，只能用[]语法
      arr.push(`${key}=${params[key]}`) // id=100   appkey=laotang
    }
    // console.log(arr.join('&'))
    let querystring = arr.join('&')
    // 2. 发送请求基本的5个步骤
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('loadend', function () {
      // 这里无论请求成功，还是失败，都会执行
      // 所以，这里可以得到成功的响应结果；也能得到失败的错误信息
      // console.log(xhr) // xhr.status 表示响应状态码
      if (xhr.status >= 200 && xhr.status < 300) {
        // console.log('成功', JSON.parse(xhr.response))
        resolve(JSON.parse(xhr.response))
        // 说明请求成功
      } else if (xhr.status >= 300) {
        // 说明请求有问题
        // console.log('失败', JSON.parse(xhr.response))
        reject(JSON.parse(xhr.response))
      }
    })
    xhr.open(method, url + '?' + querystring)
    // 3. 判断请求体的类型
    if (data instanceof FormData) {
      // 说明data是FormData对象
      xhr.send(data) // 发送FormData数据，不需要设置Content-Type
    } else if (typeof data === 'object') {
      // 说明data是普通的字面量对象
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(data))
    } else if (typeof data === 'string') {
      // 说明data是查询字符串
      // console.log('字符串')
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(data)
    } else {
      // 说明没有data
      xhr.send()
    }
  })

  return p
}
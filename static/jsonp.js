function ajax(options){
  // 请求配置
  let config = Object.assign({
    method: "get",
    url: "",
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    jsonp: "callback", // 与后端约定
    data: "",
    success:function(){}
  }, options)
  // 处理jsonp请求
  if(config.dataType === "jsonp"){
    jsonpFn(config.url, config.data, config.jsonp, config.success);
    return false;
  }
  function jsonpFn(url, data, cbName, cbFn){
    let fnName = "KKB_"+Math.random().toString().substr(2);
    window[fnName] = cbFn;
    let path = url+"?"+o2u(data)+"&"+cbName+"="+fnName;
    let o = document.createElement("script");
    o.src = path;
    document.querySelector("head").appendChild(o);
  }

  let xhr = new XMLHttpRequest();
  if(config.method == "get"){
    let data = o2u(config.data)
    config.url = config.url + "?" + data;
  }
  // 初始化请求
  xhr.open(config.method, config.url, true);
  // 设置请求头
  for (let key in opts.headers) {
    xhr.setRequestHeader(key, config.headers[key]);
  }
  let sendData;
  switch (config.headers['content-type']) {
    case 'application/x-www-form-urlencoded':
      sendData = o2u(config.data);
      break;
    case 'application/json':
      sendData = JSON.stringify(config.data);
      break;
  }
  // 请求成功回调函数
  xhr.onload = function () {
    let resData;
    if (xhr.getResponseHeader("content-type").includes("xml")) {
        resData = xhr.responseXML;
    } else {
        resData = JSON.parse(xhr.responseText);
    }
    options.success(resData);
  }
  // 发送请求
  if (options.method == "get") {
    xhr.send();
  } else {
    xhr.send(sendData);
  }
}
// 数据修改：name=1&sex="name"
function o2u(obj) {
  let keys = Object.keys(obj);
  let values = Object.values(obj);
  return keys.map((v, k) => {
      return `${v}=${values[k]}`;
  }).join("&");
}
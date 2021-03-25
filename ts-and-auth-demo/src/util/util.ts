// 存入sessionStorage的数据类型接口
interface dataConfig {
  content: object | number | string | boolean,
  type: string
}

// 存
export const setStore = (name: string, data: object | number | string | boolean) => {
  let obj: dataConfig = {
    type: typeof data,
    content: data
  }
  sessionStorage.setItem(name, JSON.stringify( obj));
}

// 取
export const getStore = (name: string) => {
  let res = sessionStorage.getItem(name) || ''
  let obj: dataConfig = JSON.parse(res);
  let content;
  if(obj.type === 'number') {
    content = Number(obj.content);
  }
  if(obj.type === 'string' || obj.type === 'object') {
    content = obj.content;
  }
  if(obj.type === 'boolean') {
    content = eval(obj.content+'')
  }
  return content;
}

// 删
export const removeStore = (name: string) => {
  sessionStorage.removeItem(name);
}

export const removeAll = () => {
  sessionStorage.clear();
}
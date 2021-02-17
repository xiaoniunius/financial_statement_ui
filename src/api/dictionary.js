import axios from '@/common/request'

export function add(data) {
   return axios({
     url: "/dictionary/add",//这个地址是去掉公共地址和私有域名之后剩下的地址
     method: "POST",//请求方式 支持多种方式  get post put delete 等等
     data
   });
 }
export function deletes(id) {
  return axios({
    url: "/dictionary/delete/"+id,//这个地址是去掉公共地址和私有域名之后剩下的地址
    method: "GET",//请求方式 支持多种方式  get post put delete 等等
  });
}
export function update(data) {
  return axios({
    url: "/dictionary/update",//这个地址是去掉公共地址和私有域名之后剩下的地址
    method: "POST",//请求方式 支持多种方式  get post put delete 等等
    data
  });
}
export function getDicTree() {
  return axios({
    url: "/dictionary/getDicTree",//这个地址是去掉公共地址和私有域名之后剩下的地址
    method: "GET"//请求方式 支持多种方式  get post put delete 等等
  });
}
export function getDetailById(id) {
  return axios({
    url: "/dictionary/getDetailById/"+id,//这个地址是去掉公共地址和私有域名之后剩下的地址
    method: "GET",//请求方式 支持多种方式  get post put delete 等等
  });
}
export function getSonDicByParentId(parentId) {
  return axios({
    url: "/dictionary/getSonDicByParentId/"+parentId,//这个地址是去掉公共地址和私有域名之后剩下的地址
    method: "GET",//请求方式 支持多种方式  get post put delete 等等
  });
}
export function getPageList(data) {
  return axios({
    url: "/dictionary/getPageList",//这个地址是去掉公共地址和私有域名之后剩下的地址
    method: "POST",//请求方式 支持多种方式  get post put delete 等等
    data
  });
}
export function getDicSort() {
  return axios({
    url: "/dictionary/getDicSort",//这个地址是去掉公共地址和私有域名之后剩下的地址
    method: "GET"//请求方式 支持多种方式  get post put delete 等等
  });
}
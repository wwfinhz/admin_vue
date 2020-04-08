import axios from 'axios';

const HOST_NAME = 'http://localhost:8080';

  export const loginwuye = function loginwuye(params) {
    return axios.post(HOST_NAME + '/wuye/loginwuye', params)
  }
  export const registerwuye = function registerwuye(params) {
    return axios.post(HOST_NAME + '/wuye/registerwuye', params)
  }
  export const updatewuye = function updatewuye(params) {
    return axios.post(HOST_NAME + '/wuye/updatewuye', params)
  }
  export const findbywyid = function findbywyid(params) {
    return axios.get(HOST_NAME + '/wuye/findbywyid', {params:params})
  }
  export const findallgg = function findallgg() {
    return axios.get(HOST_NAME + '/gonggao/findall')
  }
  export const addgonggao = function addgonggao(params) {
    return axios.post(HOST_NAME + '/gonggao/add', params)
  }
  export const findallhuzhu = function findallhuzhu() {
    return axios.get(HOST_NAME + '/huzhu/findallhz')
  }
  export const delhuzhu = function delhuzhu(params) {
    return axios.get(HOST_NAME + '/huzhu/delhuzhu',{params:params})
  }
  export const addfangchan = function addfangchan(params) {
    return axios.post(HOST_NAME + '/fangchan/addfangchan', params)
  }
  export const delfc = function delfc(params) {
    return axios.get(HOST_NAME + '/fangchan/delfc',{params:params})
  }
  export const findalltcw = function findalltcw() {
    return axios.get(HOST_NAME + '/tingchewei/findall')
  }
  export const addtingchewei = function addtingchewei(params) {
    return axios.post(HOST_NAME + '/tingchewei/addtingchewei', params)
  }
  export const addshebei = function addshebei(params) {
    return axios.post(HOST_NAME + '/shebei/add', params)
  }
  export const findallsb = function findallsb() {
    return axios.get(HOST_NAME + '/shebei/findall')
  }
  export const addshebeicount = function addshebeicount(params) {
    return axios.post(HOST_NAME + '/shebei/addold', params)
  }
  export const addbrrow = function addbrrow(params) {
    return axios.get(HOST_NAME + '/shebei/brrow', {params:params})
  }
  export const findsbhzbysbid = function findsbhzbysbid(params) {
    return axios.get(HOST_NAME + '/sbhz/findbysbid', {params:params})
  }
  export const del = function del(params) {
    return axios.get(HOST_NAME + '/sbhz/del', {params:params})
  }
  export const findallbx = function findallbx() {
    return axios.get(HOST_NAME + '/baoxiu/findall')
  }
  export const bxupdate = function bxupdate(params) {
    return axios.post(HOST_NAME + '/baoxiu/update',params)
  }
  export const getallts = function getallts() {
    return axios.get(HOST_NAME + '/tousu/findall')
  }
  export const tsupdate = function tsupdate(params) {
    return axios.post(HOST_NAME + '/tousu/update',params)
  }
  export const addyibiao = function addyibiao(params) {
    return axios.post(HOST_NAME + '/yibiao/add',params)
  }
  export const findalljf = function findalljf() {
    return axios.get(HOST_NAME + '/jiaofei/findall')
  }
  export const findallyibiao = function findallyibiao() {
    return axios.get(HOST_NAME + '/yibiao/findall')
  }
  export const selectyibiao = function selectyibiao(params) {
    return axios.post(HOST_NAME + '/yibiao/selectyibiao',params)
  }
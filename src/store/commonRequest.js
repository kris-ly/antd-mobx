import request from '../utils/request'
import { API } from '../utils/config'

export const getUserData = (storeData) => {
  request({
    url: API.COMMONDATA,
  })
  .then(res => res.json())
  .then((data) => {
    storeData.user = data.user
  })
}

export const getCommonData = (storeData) => {
  request({
    url: API.COMMONDATA,
  })
  .then((data) => {
    if (data.errno !== 0) return
    storeData.user = data.data.user
  })
}

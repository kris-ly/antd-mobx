import request from '../utils/request'
import { API } from '../utils/config'

export const temp = 'temp' // 无用

export const getCommonData = (storeData) => {
  request({
    url: API.COMMONDATA,
  })
  .then((data) => {
    if (data.errno !== 0) return
    storeData.user = data.data.user
  })
}

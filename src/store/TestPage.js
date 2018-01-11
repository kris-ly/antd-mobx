import { observable } from 'mobx'
import request from '../utils/request'
import { getCommonData } from './commonRequest'
import { message } from 'antd'
import mobxReaction from './mobxReaction'
import { API } from '../utils/config'
import getParam from '../utils/getParam'

class TestPage {
  reactions = []
  @observable data = {
    user: '',
    info: {},
  }
  @observable state = {
    queryTerm: '0',
    queryCont: '',
  }

  constructor(enableReaction) {
    if (!enableReaction) return
    const dataReaction = () => this.data.name
    this.reactions = mobxReaction([
      dataReaction,
    ])
  }

  clearReactions() {
    if (!this.reactions.length) return
    this.reactions.forEach((callback) => { callback && callback() })
  }

  getCommon = () => {
    getCommonData(this.data)
  }

  search = () => {
    const params = getParam([
      ['queryTerm', item => `${item}`],
      'queryCont',
    ], this.state)
    console.log(params)
    if (params.queryTerm === '0') {
      message.warning('请选择查询条件！')
      return
    }
    request({
      url: API.MAINLIST,
    })
    .then((data) => {
      if (data.errno !== 0) {
        message.error('查无此人..')
        return
      }
      this.data.info = data.data
    })
  }
}

export default TestPage;

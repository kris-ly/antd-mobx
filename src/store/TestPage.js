import { observable } from 'mobx'
import request from '../utils/request'
import { getCommonData } from './commonRequest'
import mobxReaction from './mobxReaction'
import { API } from '../utils/config'
import getParam from '../utils/getParam'

class TestPage {
  reactions = []
  @observable data = {
    name: '',
    user: '',
  }
  @observable state = {
    queryTerm: '',
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

  getData = () => {
    request({
      url: API.MAINLIST,
    })
    .then(res => res.json())
    .then((data) => {
      runInAction(() => {
        this.data.name = data.name
      })
    })
  }
  search = () => {
    const params = getParam([
      ['queryTerm', item => `好运来：${item}`],
      'queryCont',
    ], this.state)
    console.log(params)
  }
}

export default TestPage;

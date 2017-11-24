import { observable, action, runInAction } from 'mobx'
import request from '../utils/request'
import { getCommonData } from './commonRequest'
import mobxReaction from './mobxReaction'
import { API } from '../utils/config'

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

  @action getCommon() {
    getCommonData(this.data)
  }

  @action getData() {
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
}

export default TestPage;

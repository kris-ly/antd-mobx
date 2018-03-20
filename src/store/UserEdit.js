import { observable } from 'mobx'
import request from '../utils/request'
import { API } from '../utils/config'
import getParam from '../utils/getParam'

class TestPage {
  @observable state = {
    name: undefined,
  }

  getUser(id) {
    request({
      url: API.COMMONDATA,
      params: { id },
    })
    .then((data) => {
      if (data.errno !== 0) return
      this.state.name = data.data.user
    })
  }

  save = () => {
    const params = getParam([
      'name',
    ], this.state)
    console.log(params)
  }
}

export default TestPage;

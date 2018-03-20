import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Row, Col, Button, Form, Input } from 'antd'
import Store from '../store/UserEdit'
import setAttr from '../store/setAttr'

const FormItem = Form.Item

@observer
class UserEdit extends Component {
  store = new Store()

  componentDidMount() {
    const { params } = this.props.match
    const { id } = params
    if (id) {
      this.store.getUser(id)
    }
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    const { params } = this.props.match
    const { id } = params
    
    const { store } = this
    return (
      <div className="content">
        <h2>{id ? '编辑用户' : '添加用户'}</h2>
        <Form>
          <Row>
            <Col span={7} offset={1}>
              <FormItem {...formItemLayout} required label="姓名">
                <Input
                  placeholder="请输入关键字"
                  {...setAttr(store, 'name')}
                />
              </FormItem>
            </Col>
            <Col span={7} offset={1}>
              <Button onClick={() => { store.save() }} type="primary">保存</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
export default UserEdit;

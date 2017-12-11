import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Row, Col, Button, Form, Input, Select } from 'antd'
import Store from '../store/TestPage'
import setAttr from '../store/setAttr'
import './testPage.less'

const FormItem = Form.Item
const { Option } = Select
const isDebug = process.env.NODE_ENV === 'development'
const list = [
  '年',
  '月',
  '日',
]

@observer
class TestPage extends Component {
  componentDidMount() {
    this.store.getData()
    this.store.getCommon()
  }
  componentWillUnmount() {
    if (isDebug) this.store.clearReactions()
  }
  store = new Store(isDebug)

  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    const { store } = this
    return (
      <div className="content">
        <h1>测试</h1>
        <div>{store.data.name}</div>
        <div>{store.data.user}</div>
        <Form>
          <Row>
            <Col span={8}>
              <FormItem {...formItemLayout} required label="查询条件">
                <Select
                  {...setAttr(store, 'queryTerm')}
                >
                  {list.map(item => <Option key={item}>{item}</Option>)}
                </Select>
              </FormItem>
            </Col>
            <Col span={8}>
              <Input
                placeholder="请输入关键字"
                {...setAttr(store, 'queryCont')}
              />
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button onClick={() => { store.search() }} type="primary">搜索</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
export default TestPage;

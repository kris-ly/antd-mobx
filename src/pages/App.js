import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import request from '../utils/request'
import { API } from '../utils/config'
import { Menu, Icon, Layout } from 'antd';
import './app.less'

const { Header, Sider, Content } = Layout;
const { SubMenu, Item } = Menu

const renderItem = (item) => {
  const { name, path, iconType } = item
  return (
    <Item key={name}>
      <Icon type={iconType} /><Link style={{ display: 'inline' }} to={path}>{name}</Link>
    </Item>
  )
}

class App extends Component {
  state = {
    memuList: [],
  }
  componentDidMount() {
    request({
      url: API.MENULIST,
    }).then((res) => {
      if (res.errno !== 0) return
      this.setState({
        memuList: res.data,
      })
    })
  }
  render() {
    const { routers } = this.props
    const { memuList } = this.state
    return (
      <Layout>
        <Header className="header">Welcome!</Header>
        <Layout>
          <Sider width={180}>
            <Menu
              mode="inline"
              style={{ height: '100%' }}
            >
              {memuList.map(item => (
                item.children ?
                  <SubMenu
                    key={item.name}
                    title={<span><Icon type={item.iconType} />{item.name}</span>}
                  >
                    {item.children.map(subItem => renderItem(subItem))}
                  </SubMenu> :
                renderItem(item)
              ))}
            </Menu>
          </Sider>
          <Content>
            <Switch>
              {routers.map(item => (
                item.children ?
                  item.children.map(children => (
                    <Route
                      exact={item.exact || false}
                      path={children.path}
                      key={children.path}
                      component={children.component}
                    />
                  )) :
                  <Route
                    exact={item.exact}
                    path={item.path}
                    key={item.path}
                    component={item.component}
                  />
              ))}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App;

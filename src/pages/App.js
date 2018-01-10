import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Menu, Icon, Layout } from 'antd';
import './app.less'

const { Header, Sider, Content } = Layout;
const { SubMenu, Item } = Menu

const renderItem = (item) => {
  const { visible, name, path, iconType } = item
  if (!visible) return null
  return (
    <Item key={name}>
      <Icon type={iconType} /><Link style={{ display: 'inline' }} to={path}>{name}</Link>
    </Item>
  )
}

class App extends Component {
  render() {
    const { routers } = this.props
    return (
      <Layout>
        <Header className="header">Welcome!</Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              style={{ height: '100%' }}
            >
              {routers.map(item => (
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

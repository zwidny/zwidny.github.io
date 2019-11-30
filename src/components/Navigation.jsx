import React from 'react'
import {Layout, Menu} from 'antd';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Navigation extends React.Component {
  state = {
    collapsed: false,
    categories: categories,
    url: '/git/2019/02/02/git-checkout-file-from-specify-branch.html',
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };


  // 如果有什么也不做, 否则创建默认并返回
  setDefault(obj, key, value) {
    let v = obj[key]
    if (v !== undefined) return
    obj[key] = value
  }

  /*
   格式化categories
   Arguments:
     categories(object): {'A': [], 'A:B': []}
   Returns(object):
     {'A': {
        'content': [],
        'child': {
          'B': {
            'content':[],
            'child': {}
          }}}}
   */
  formatCategories(categories) {
    const root = {}
    for (let [k, v] of Object.entries(categories)) {
      const ck = k.split(':')
      this.setDefault(root, ck[0], { content: [], child: {} })
      if (ck.length === 1) {
        root[ck[0]].content = v
        continue
      }
      // 对于相同的key, jekyll已经帮我们处理好了, 没必要在处理
      // 如果没有, 设置默认值
      let patient = root[ck[0]]
      for (let i = 1; i < ck.length; i++) {
        this.setDefault(patient.child, ck[i], { content: [], child: {} })
        patient = patient.child[ck[i]]
      }
      patient.content = v
    }
    return root
  }

  renderCategories(categories) {
    return Object.entries(categories).map((item) => (
      <SubMenu key={item[0]}
               title={
                 <span>
                  <span>{item[0]}</span>
                </span>
               }
      >
        {item[1].content.map(i => (
          <Menu.Item key={i.title} onClick={e => this.setState({ url: i.url })}>{i.title}</Menu.Item>
        ))}
        {this.renderCategories(item[1].child)}
      </SubMenu>
    ))
  }

  render() {
    const categories = this.formatCategories(this.state.categories)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo"/>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {this.renderCategories(categories)}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            {/*<div style={{ padding: 24, background: '#fff', minHeight: 360 }} dangerouslySetInnerHTML={{__html: this.state.content}}></div>*/}
            <iframe style={{ height: '100%', width: '100%' }} src={this.state.url}></iframe>
          </Content>
          <Footer
            style={{
              textAlign: 'center'
            }}>
            Ant Design ©2018 Created by zwidny </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Navigation
<template>
  <a-layout id="components-layout-demo-fixed-sider" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <a-menu
          :defaultSelectedKeys="[0]"
          mode="inline"
          theme="dark"
          :inlineCollapsed="collapsed">
        <a-menu-item v-for="(item, index) in navigation" :key="index">
          <router-link :to="{name: item.name}">{{item.verbose_name}}</router-link>
        </a-menu-item>
        <a-sub-menu key="blog">
          <span slot="title"><a-icon type="appstore"/><span>Blog</span></span>
          <div v-for="(k, v, i) in categories" :key="'blog'+i">
            <div v-for="{kv, vv, vi} in v" v-bind:key="ii">
              <div v-if="ki === '-'"></div>
              <a-menu-item v-for="(b, viIdx) in vi" :key="viIdx">
                <a :href="b.url">{{b.title}}</a>
              </a-menu-item>
            </div>
          </div>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        zwidny Blog ©2018 Created by <a href="https://ant.design/">Ant</a> and <a
          href="https://jekyllrb.com/">jekyll</a>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      navigation: jekyll_data.navigation,
      blog: jekyll_data.blog,
    }
  },
  methods: {
    slugify: function (title) {
      return title.trim().toLowerCase().split(' ').join('-')
    },
    formatCategories(categories) {
      const root = {}
      for (let [k, v] of Object.entries(categories)) {
        const ck = k.split(':')
        if (ck.length === 1) {
          root[ck[0]] = { '-': v }
        } else {
          // 对于相同的key, jekyll已经帮我们处理好了, 没必要在处理
          // 如果没有, 设置默认值
          this.setDefault(root, ck[0], {})
          let patient = root[ck[0]]
          for (let i = 1; i < ck.length; i++) {
            this.setDefault(patient, ck[i], {})
            patient = patient[ck[i]]
          }
          patient['-'] = v
        }

      }
      return root
    },
    // 如果有什么也不做, 否则创建默认并返回
    setDefault(obj, key, value) {
      let v = obj[key]
      if (v !== undefined) return
      obj[key] = value
    }

  },
  computed: {
    categories(){
      return this.formatCategories(jekyll_data.categories)
    }
  },
  mounted() {
    console.log('categories: ', this.categories)
  }
}
</script>

<template>
    <a-layout id="components-layout-demo-fixed-sider" style="min-height: 100vh">
        <a-layout-sider
                collapsible
                v-model="collapsed"
        >

            <a-menu
                    :defaultSelectedKeys="[0]"
                    mode="inline"
                    theme="dark"
                    :inlineCollapsed="collapsed"
            >
                <a-menu-item v-for="(item, index) in navigation" :key="index">
                    <router-link :to="{name: item.name}">{{item.verbose_name}}</router-link>
                </a-menu-item>
                <a-sub-menu key="blog">
                    <span slot="title"><a-icon type="appstore"/><span>Blog</span></span>
                    <a-menu-item v-for="(b, i) in blog" :key="'blog'+i">
                        <a :href="b.url">{{b.title}}</a>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content style="margin: 0 16px">
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                zwidny Blog ©2018 Created by <a href="https://ant.design/">Ant</a> and <a href="https://jekyllrb.com/">jekyll</a>
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
                return title.trim().toLowerCase().split(" ").join("-")
            }
        }
    }
</script>

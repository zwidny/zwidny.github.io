<template>
    <a-layout id="components-layout-demo-fixed-sider" style="min-height: 100vh">
        <a-layout-sider
                collapsible
                v-model="collapsed"
        >

            <a-menu
                    :defaultSelectedKeys="['1']"
                    :defaultOpenKeys="['sub1']"
                    mode="inline"
                    theme="dark"
                    :inlineCollapsed="collapsed"
            >
                <a-menu-item v-for="(item, index) in navigation" :key="index">
                    <a-icon type="pie-chart"/>
                    <span>{{item.name}}</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content style="margin: 0 16px"></a-layout-content>
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
                navigation: data.navigation,
            }
        },
    }
</script>

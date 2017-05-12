<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import THeader from "./components/header/header.vue"
    import TSidebar from "./components/sidebar/sidebar.vue"
    import TBreadcrumb from "./components/breadcrumb/breadcrumb.vue"
    import TContextbox from "./components/context/contextbox.vue"


    export default {
        name: 'app',
        components: {
            THeader,
            TSidebar,
            TBreadcrumb,
            TContextbox
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "common/mixins/variable.less";
    html,
    body{
        height: 100%;
        width: 100%;
        font-family: @body-font-family;
    }
    .login {
        height: 950px;
        width: 100%;
        background-image: linear-gradient(90deg, #429cfe, #64b4fd);
    }
</style>

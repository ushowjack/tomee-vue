<template>
    <div id="app">
        <t-header></t-header>
        <div class="context">
            <t-sidebar></t-sidebar>
            <div class="side-context">
                <t-breadcrumb></t-breadcrumb>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import THeader from "./components/header/header.vue"
    import TSidebar from "./components/sidebar/sidebar.vue"
    import TBreadcrumb from "./components/context/breadcrumb.vue"


    export default {
        name: 'app',
        components:{
            THeader,
            TSidebar,
            TBreadcrumb
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "./common/style/common";
    @import "./common/mixins/normalize";
    @import "./common/mixins/variable";
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        position: relative;
        width: 100%;
        height: 100%;
        min-width: @min-width;
    }

    .context{
        position: relative;
        max-width: 100%;
        height: ~'calc(100% - 153px)';
        margin: 0 auto;
        .side-context{
            position: absolute;
            top: 0;
            right: 0;
            width: ~'calc(100% - 350px)';
            /*width: 100%;*/
            height: 100%;
        }
        .search{
            float: right;
        }
    }
    .el-breadcrumb{
        background-color: #f5f5f5;
        padding: 15px;
        font-size: @input-font-size;
    }

</style>

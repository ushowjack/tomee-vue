<template>
    <div id="main">
        <t-header></t-header>
        <div class="context">
            <t-sidebar></t-sidebar>
            <div class="side-context">
                <t-breadcrumb></t-breadcrumb>
                <t-contextbox></t-contextbox>
            </div>
        </div>
    </div>
</template>

<script>
    import THeader from "./components/header/header.vue"
    import TSidebar from "./components/sidebar/sidebar.vue"
    import TBreadcrumb from "./components/breadcrumb/breadcrumb.vue"
    import TContextbox from "./components/context/contextbox.vue"


    export default {
        name: 'app',
        components:{
            THeader,
            TSidebar,
            TBreadcrumb,
            TContextbox
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "./common/style/common";
    @import "./common/mixins/normalize";
    @import "./common/mixins/variable";

    #main {
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
        height: 797px;
        margin: 0 auto;
        @media screen and (max-width: 1100px){
            margin-left: 350px;
        }
        .side-bar {
            width: 350px;
            min-width: 350px;
            height: 100%;
            position: absolute;
            overflow-y: auto!important;
            background: #324157;
        }
        .side-context{
            position: absolute;
            overflow-y: auto!important;
            top: 0;
            right: 0;
            width: ~'calc(100% - 350px)';
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
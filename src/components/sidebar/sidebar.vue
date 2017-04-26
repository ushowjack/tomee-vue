<template>
    <div class="side-bar">
        <ul class="mainmenu">
            <sidebar-item v-for="(item,index) in sidebar" :key="index" :model="item" :url="url + item.name">
            </sidebar-item>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import sidebarItem from "./sidebarItem.vue"

    export default {
        components: {
            sidebarItem
        },
        data(){
            return {
                sidebar: [
                    {
                        name: '人员信息管理',
                        children: [
                            {name: '内部人员信息管理'},
                            {name: '系统用户管理'},
                            {name: '退伍人员管理'},
                        ],
                    },
                    {
                        name: '日常管理',
                        children: [
                            {name: '人员外出申请管理'},
                            {name: '人员上下排班管理'},
                        ],
                    },
                    {
                        name: '岗哨管理',
                        children: [
                            {name: '岗亭信息管理'},
                            {name: '站岗排班管理'},
                            {name: '站岗记录管理'},
                        ],
                    },
                    {
                        name: '考勤管理',
                        children: {name: '休假申请管理'},
                    },

                    {
                        name: '日志管理',
                        children: {name: '用户操作日志管理'},
                    },
                ],
                url: "#/"
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    @import "../../common/mixins/variable";
    @import "../../common/mixins/opacity";
    @import "../../common/mixins/reset-ul";

    //侧边栏主框架
    .side-bar {
        width: 350px;
        min-width: 350px;
        height: ~'calc(100% - 153px)';
        position: fixed;
        overflow-x: hidden;
        overflow-y: auto;
        background: #353b49;
    }

    //主菜单样式
    .mainmenu {
        height: 100%;
        .reset-ul();
        .mainlist {
            width: 100%;
            & > a {
                display: block;
                text-align: left;
                width: ~"calc(100% - @{side-bar-padding})";
                height: @mainmenu-item-height;
                line-height: @mainmenu-item-height;
                padding-left: @mainmenu-item-height;
                color: #ffffff;
                font-size: 18px;
                .opacity(0.8);
                transition: 0.6s all;
                &:hover {
                    background: lighten(#353b49, 10%);
                }
                &.active {
                    background: lighten(#353b49, 30%);
                    font-size: 20px;
                    height: @mainmenu-item-height + 4px;
                    line-height: @mainmenu-item-height + 4px;
                    .opacity(1);
                }
            }
        }
    }


</style>
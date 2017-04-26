<template>
    <div class="side-bar">
        <ul class="mainmenu">
            <sidebar-item v-for="(item,index) in sidebar" :key="index" :model="item">
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
                            {name: '人员借入借出管理'},
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
                            {name: '视频异常记录'},
                        ],
                    },
                    {
                        name: '访客管理',
                        children: [
                            {name: '预约来访信息管理'},
                            {name: '来访信息记录管理'},
                        ],
                    },
                    {
                        name: '考勤管理',
                        children: [
                            {name: '打卡考勤管理'},
                            {name: '休假申请管理'},
                        ],
                    },
                    {
                        name: '手环管理',
                        children: [
                            {name: '手环信息管理'},
                            {name: '手环使用记录管理'},
                            {name: '手环维修管理'},
                        ],
                    },
                    {
                        name: '车辆管理',
                        children: [
                            {name: '车辆信息管理'},
                            {name: '车辆进出记录管理'},
                        ],
                    },
                    {
                        name: '摄像头管理',
                        children: {name: '摄像头信息管理'},
                    },
                    {
                        name: '视频异常管理',
                        children: {name: '人脸识别管理'},
                    },
                    {
                        name: '权限管理',
                    },
                    {
                        name: '日志管理',
                        children: [
                            {name: '用户操作日志管理'},
                            {name: '系统日志管理'},
                        ],
                    },
                    {
                        name: '其他管理',
                        children: [
                            {name: '性质信息管理'},
                            {name: '职务信息管理'},
                            {name: '警衔信息管理'},
                            {name: '营区信息管理'},
                            {name: '大门信息管理'},
                            {name: '组织机构信息管理'},
                            {name: '上下排班时段管理'},
                            {name: '站岗排班时段管理'},
                        ],
                    },
                ]
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    @import "../../common/mixins/variable";
    @import "../../common/mixins/opacity";
    @import "../../common/mixins/reset-ul";
    @import "../../common/mixins/show";

    //侧边栏主框架
    .side-bar {
        width: 350px;
        min-width: 350px;
        height: 100%;
        position: fixed;
        overflow-y: scroll;
        top: @header-height;
        background: #353b49;
    }

    //主菜单样式
    .mainmenu {
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

    //子菜单样式
    .submenu {
        .reset-ul();
        .sublist {
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
                transition: 0.3s all;
                background: darken(#353b49, 10%);
                &:hover {
                    background: darken(#353b49, 5%);
                }
                &.active {
                    background: darken(#353b49, 10%);
                    .opacity(1);
                }
            }
        }
    }

</style>
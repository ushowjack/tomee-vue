<template>
    <div class="side-bar">
        <el-menu theme="dark"
                 :router=true
                 :unique-opened=true
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
            <el-submenu index="1">
                <template slot="title">人员信息管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/人员信息管理/内部人员信息管理">内部人员信息管理</el-menu-item>
                    <el-menu-item index="/人员信息管理/系统用户管理">系统用户管理</el-menu-item>
                    <el-menu-item index="/人员信息管理/退伍人员管理">退伍人员管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">日常管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/日常管理/人员外出申请管理">人员外出申请管理</el-menu-item>
                    <el-menu-item index="/日常管理/人员上下排班管理">人员上下排班管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu index="3">
            <el-submenu index="3">
                <template slot="title">岗哨管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/岗哨管理/岗亭信息管理">岗亭信息管理</el-menu-item>
                    <el-menu-item index="/岗哨管理/站岗排班管理">站岗排班管理</el-menu-item>
                    <el-menu-item index="/岗哨管理/站岗记录管理">站岗记录管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">考勤管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/考勤管理">休假申请管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">日志管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/日志管理">用户操作日志管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script type="text/ecmascript-6">
    import sidebarItem from "./sidebarItem.vue"

    export default {
        components: {
            sidebarItem
        },
        data(){
            return {}
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>


<style lang="less" rel="stylesheet/less">
    div.el-menu-item-group__title {
        height: 0;
        width: 0;
        font-size: 0;
        padding-top: 0 !important;
        margin: 0;
    }

    .el-submenu {
        .el-submenu__title{
            font-size: 18px;
        }
        li {
            font-size: 16px;
        }
    }
</style>
<style lang="less" rel="stylesheet/less" scoped>
    @import "../../common/mixins/variable";
    @import "../../common/mixins/opacity";
    @import "../../common/mixins/reset-ul";
    //侧边栏主框架


    //主菜单样式
/*     .mainmenu {
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
     }*/

</style>
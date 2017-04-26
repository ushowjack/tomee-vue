<template>
    <li class="mainlist">
        <a :href="url"
           :class="{bold: isFolder}"
           @click="toggle">
            {{model.name}}
        </a>
        <ul class="submenu"
            v-if="isFolder"
            v-show="open">
            <sidebar-item
                    class="sublist"
                    v-for="(model,index) in model.children"
                    :key="index"
                    :url="url + '/' + model.name"
                    :model="model">
            </sidebar-item>
        </ul>
    </li>

</template>
<script type="text/ecmascript-6">
    export default {
        name: "sidebarItem",
        props: {
            model: Object,
            url: String
        },
        data(){
            return {
                open: false
            }
        },
        methods: {
            toggle () {
                if (this.isFolder) {
                    this.open = !this.open
                }
            },
        },
        computed: {
            isFolder: function () {
                return this.model.children &&
                    this.model.children.length
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    @import "../../common/mixins/variable";
    @import "../../common/mixins/opacity";
    @import "../../common/mixins/reset-ul";

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
                padding-left: @mainmenu-item-height + 20px;
                color: #ffffff;
                font-size: 16px;
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
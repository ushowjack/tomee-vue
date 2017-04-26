<template>
    <li class="mainlist">
        <a :href="'#/' + encodeURIComponent(model.name)"
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
                    :model="model">
            </sidebar-item>
        </ul>
    </li>

</template>
<script type="text/ecmascript-6">
    export default {
        name: "sidebarItem",
        props: {
            model: Object
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
    li {
        color: #fff;
    }
</style>
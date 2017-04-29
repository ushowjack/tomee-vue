<template>
    <div class="t-search">
        <el-input
                placeholder="请输入关键词"
                icon="search"
                v-model="search"
                :maxlength="10"
                :on-icon-click="handleIconClick">
        </el-input>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                search: ''
            }
        },
        methods: {
            handleIconClick(ev) {
                alert(this.search);
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>
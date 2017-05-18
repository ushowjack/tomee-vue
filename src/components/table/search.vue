<template>
    <div class="t-search">
        <el-input
                placeholder="请输入关键词"
                icon="search"
                v-model="search"
                :maxlength="10"
                @change="handleIconClick">
        </el-input>
    </div>

</template>

<script>
/*    import Vue from 'vue'
    import {Input} from 'element-ui'
    Vue.use(Input)*/

    export default {
        data() {
            return {
                search: ''
            }
        },
        methods: {
            handleIconClick() {
                this.$emit('searchMsg',this.search);
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>
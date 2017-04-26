<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script type="text/ecmascript-6">

    export default {
        name: 'breadcrumb',
        props: [],
        components: {}
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>
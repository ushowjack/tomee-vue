<template>
    <el-breadcrumb separator="/" @hashchange="hashchange">
        <span>当前页面：</span>
        <template v-for="(item,index) in url">
            <el-breadcrumb-item v-if="index === 0" :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-else-if="index === (url.length - 1) && index !== 0">{{ item }}</el-breadcrumb-item>
            <el-breadcrumb-item v-else :to="'/' + url.slice(1,index + 1).join('/')">{{ item
                }}</el-breadcrumb-item>
        </template>
        <!--todo 如何添加返回的路由控件-->
        <!--<span @click="goBack">返回上一页</span>-->
    </el-breadcrumb>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'breadcrumb',
        data(){
            return {
                url: this.$route.fullPath.split("/")
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            "$route": "hashchange"
        },
        methods: {
            hashchange(){
                this.url = this.$route.fullPath.split("/")
//                console.log(this.url)
            }
        }
    }


</script>

<style lang="less" rel="stylesheet/less">
    span {
        float: left;
    }

</style>
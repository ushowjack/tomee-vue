<template>
    <div class="t-btn">
        <!--<el-button v-for="(item,index) in btnArr" :key="index">{{item.value}}</el-button>-->
        <el-button
                v-for="(item,index) in btnData"
                :key="index">
            {{item.value}}
        </el-button>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "tBtn",
        props: ['btnData']
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>
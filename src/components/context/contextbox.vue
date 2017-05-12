<template>
    <div class="comtextbox">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
    import innerPersonMSG from "./innerPersonMSG.vue"
    export default {
        props: [],
        components: {
            innerPersonMSG
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .comtextbox {
        width: 100%;
        height: ~'calc(100% - 44px)';
        /*background-color: #ccc;*/
        overflow: auto;
    }


</style>
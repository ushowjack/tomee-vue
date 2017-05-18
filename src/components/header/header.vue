<template>
    <header>
        <img src="./tomeeLogo.png" alt="淘米科技">
        <img src="./loginTitle.png" alt="淘米智慧营房系统">

        <ul class="login-state">
            <li><span>宝安大队</span></li>
            <li><span @click="loginOut">退出</span></li>
        </ul>
    </header>
</template>

<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions([
                'clearToken'
            ]),
            loginOut(){
                this.clearToken();
                this.$router.push("/login");
//                console.log(this.$router.currentRoute.fullPath)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    @import "../../common/mixins/variable";
    @import "../../common/mixins/opacity";
    @import "../../common/mixins/absolute";
    @import "../../common/mixins/reset-ul";

    header {
        width: 100%;
        height: @header-height;
        position: relative;
        background: @header-bg;
        background: #64b4fd @ie8;
        img {
            display: block;
        }
        img:nth-child(1) {
            width: 302px;
            height: 16px;
            .absolute(52px, 36px);
        }
        img:nth-child(2) {
            width: 464px;
            height: 45px;
            .absolute(54px, 72px);
        }
        ul {
            .absolute(20px, 94px, right, top);
            .reset-ul();
            li {
                border-left: 2px solid #ffffff;
                display: inline-block;
                width: 100px;
                &:nth-child(1) {
                    border-left: none;
                }
            }
            span {
                width: 100%;
                display: block;
                font-family: @body-font-family;
                color: #ffffff;
                text-align: center;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
</style>
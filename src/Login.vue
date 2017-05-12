<template>
    <div class="login">
        <div class="container">
            <!--图片-->
            <img src="./common/images/loginPg.png" class="loginPg">
            <!--登录组件-->
            <div class="login-component">
                <div class="login-head">
                    <span>淘米科技智慧营房</span>
                </div>
                <form>
                    <div class="items-list">
                        <div class="input-item">
                            <input type="text" name="userName" placeholder="用户名"/>
                        </div>
                        <div class="input-item">
                            <input type="password" name="password" placeholder="密码"/>
                        </div>
                        <div class="input-item">
                            <input type="text" name="captcha" placeholder="验证码"/>
                            <img :src="captchaSrc"
                                 alt="captcha"
                                 id="captchaIMG"
                                 @click="changeCaptcha">
                        </div>
                    </div>
                    <div class="forget">
                        <span class=""></span>
                        <a href="#">忘记密码</a>
                    </div>
                    <button type="button" name="login" id="login">
                        <span>登&nbsp;&nbsp;&nbsp;&nbsp;录</span>
                    </button>
                </form>
            </div>

            <div class="logo">
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                captchaSrc: 'http://127.0.0.1/SmartBarracksPHP_Code/Login/verify'
            }
        },
        methods: {
            GetDate() {
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let day = now.getDate();
                let hours = now.getHours();
                let min = now.getMinutes();
                let sec = now.getSeconds();
                let time = `${year}-${month}-${day} ${hours}:${min}:${sec}`;
                return time;
            },
            Timestamp(url) {
                let getTimestamp = this.GetDate();
                if (url.indexOf("timestamp") > -1) {
                    url = url.substring(0, url.indexOf("timestamp") - 1);
                }
                if (url.indexOf("?") > -1) {
                    url = `${url}&timestamp=${getTimestamp}`;
                } else {
                    url = `${url}?timestamp=${getTimestamp}`;
                }
                return encodeURI(url);
            },
            changeCaptcha(){
                let url = this.captchaSrc;
                this.captchaSrc = this.Timestamp(url)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "./common/mixins/variable";
    @import "./common/mixins/opacity";

    .container {
        position: relative;
        width: 100%;
        height: 100%;
        min-width: @min-width;
        background: url("./common/images/loginTitle.png") no-repeat 10% 10%;

        .loginPg {
            position: absolute;
            top: 25%;
            left: 5%;
            width: 40%;
            min-width: 540px;
            height: auto;
        }
    }

    .login-component {
        width: @login-component-width;
        height: @login-component-height;
        position: absolute;
        top: 30%;
        left: 60%;
        box-shadow: 0 3px 20px #222;
        .login-head {
            color: #fff;
            background: #353b49;
        }
        form {
            background: #f2f7fd;
            #login {
                background: #64b4fd;
                color: #fff;
            }
            .items-list {
                background: #fff;
            }
        }
    }

    .logo {
        width: 339px * 2 / 3;
        height: 18px * 2 / 3;
        background: url("./common/images/tomeeLogo.png") no-repeat;
        background-size: cover;
        position: absolute;
        top: ~'calc(50% + 300px)';
        left: 70%;
    }

    .login-component {
        .login-head {
            position: relative;
            width: 100%;
            height: 55px;
            color: #fff;
            background: #353b49;
            & > span {
                font-size: @h1-tittle-text;
                line-height: @h1-tittle-text;
                font-family: @body-font-family;
                position: absolute;
                top: 50%;
                left: 0;
                margin-top: -@h1-tittle-text / 2;
                width: 100%;
                text-align: center;
            }
        }

        form {
            height: 85%;
            width: 100%;
            text-align: center;
            .items-list {
                margin-top: 10%;
                display: inline-block;
                width: 80%;
            }
            .input-item {
                position: relative;
                border: solid 1px #ccc;
                border-bottom: none;
                width: 100%;
                height: 40px;
                background: no-repeat 0 center;
                &:nth-last-child(1) {
                    border-bottom: solid 1px #ccc;
                    & > #captchaIMG {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: @captchaIMG-width;
                        height: @captchaIMG-height;
                        min-width: @captchaIMG-width;
                    }
                }
                & > input {
                    display: inline-block;
                    width: ~'calc(100% - 2px)';
                    height: ~'calc(100% - 2px)';
                    border: none;
                    background: none;
                    font-size: @input-font-size;
                    text-indent: 50px;
                    &[name="captcha"] {
                        width: ~"calc(100% - 96px)";
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }

            }
            .forget {
                width: 80%;
                margin: 8px auto;
                text-align: right;
                a {
                    font-size: 13px;
                    text-decoration: none;
                    color: #64b4fd;
                    &:hover {
                        text-decoration: underline;
                        color: @btn-color-hover;
                    }
                }
                span {
                    font-size: 13px;
                    font-weight: 500;
                    &.warn {
                        color: @color-warn;
                    }
                    &.success {
                        color: @color-success;
                    }

                }
            }

        }
    }

    #login {
        display: inline-block;
        margin-top: 5%;
        width: 80%;
        height: 40px;
        border: none;
        text-align: center;
        span {
            float: none;
            margin: auto;
        }
        &:hover {
            background: @btn-color-hover;
            span {
                .opacity(0.7);
            }
        }
    }

</style>
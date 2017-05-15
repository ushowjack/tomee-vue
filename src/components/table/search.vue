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
/*    import Vue from 'vue'
    import {Input} from 'element-ui'
    Vue.use(Input)*/

    import axios from 'axios'

    var REST_MAIN = 'http://127.0.0.1/SmartBarracksPHP_Code/';
    var REST_UserLog_index = 'Userlog/index';

    export default {
        data() {
            return {
                search: ''
            }
        },
        methods: {
            handleIconClick(ev) {
//                alert(this.search);
                axios.get(REST_MAIN + REST_UserLog_index)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>
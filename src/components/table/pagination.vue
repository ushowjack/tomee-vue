<template>
    <div class="pagination">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
/*    import Vue from 'vue'
    import {Pagination} from 'element-ui'
    Vue.use(Pagination)*/

    export default {
        props: {
            total: Number,
            pageSize: Number
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$emit("getPageEvent",this.currentPage);
            }
        },
        data() {
            return {
                currentPage: 1,
            };
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    .el-pagination {
        padding: 20px !important;
        text-align: right;
        .el-pagination__jump {
            margin: 0 30px;
            float: right;
        }
    }

</style>
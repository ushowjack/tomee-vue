<template>
    <div class="pagination">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="1000">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                currentPage: 5,
            };
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .el-pagination{
        padding: 20px!important;
        text-align: right;
        .el-pagination__jump {
            margin: 0 30px;
            float: right;
        }
    }

</style>
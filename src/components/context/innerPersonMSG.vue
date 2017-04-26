<template>
    <div class="table">
        <t-table></t-table>
    </div>
</template>

<script type="text/ecmascript-6">
    import TTable from "../table/table.vue"
    export default {
        components: {
            TTable
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .table{
        width: 90%;
        margin: 20px auto;

    }
</style>
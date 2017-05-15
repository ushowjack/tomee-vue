<template>
    <div class="table-group">
        <t-search></t-search>
        <el-table
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    header-align="center"
                    prop="schedule"
                    label="时间/日期">
            </el-table-column>
            <el-table-column
                    v-for="(item,key) in date"
                    header-align="center"
                    :key="key"
                    :prop="item"
                    :label="item">
            </el-table-column>
        </el-table>
        <t-pagination></t-pagination>

        <el-dialog
                title="排班修改"
                v-model="editUser"
                size="tiny"
                @close="resetForm('addForm','editUser')">
            <div class="dialog-context">
                <el-form
                        label-position="right"
                        label-width="100px"
                        :model="addForm"
                        ref="addForm">
                    <el-form-item label="日期："
                                  prop="date">
                        <el-input v-model="addForm.date">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="时间："
                                  prop="time">
                        <el-input v-model="addForm.time">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="执勤人员："
                                  prop="name">
                        <el-input v-model="addForm.name">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-form slot="footer"
                     class="dialog-footer">
                <el-form-item>
                    <el-button type="primary"
                               @click="submitForm('addForm','editUser')">
                        提 交
                    </el-button>
                    <el-button @click="editUser = false">
                        取 消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                title="排班添加"
                v-model="addUser"
                size="tiny"
                @close="resetForm('addForm','addUser')">
            <div class="dialog-context">
                <el-form
                        label-position="right"
                        label-width="120px"
                        :model="addForm"
                        ref="addForm">
                    <el-form-item label="日期："
                                  prop="date">
                        <el-input v-model="addForm.date">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="时间："
                                  prop="time">
                        <el-input v-model="addForm.time">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="执勤人员："
                                  prop="name">
                        <el-input v-model="addForm.name">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-form slot="footer"
                     class="dialog-footer">
                <el-form-item>
                    <el-button type="primary"
                               @click="submitForm('addForm','addUser')">
                        提 交
                    </el-button>
                    <el-button @click="addUser = false">
                        取 消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">


    import TSearch from "../table/search.vue"
    import TPagination from "../table/pagination.vue"

    export default {
        components: {
            TSearch,
            TPagination
        },
        data() {
            return {
                date: ['name1', 'name2', 'name3', 'name4', 'name5', 'name6', 'name7'],
                tableData: [
                    {
                        'schedule': '9:00~12:00',
                        'name1': '大多',
                        'name2': '大多',
                        'name3': '大多',
                        'name4': '大多',
                        'name5': '大多',
                        'name6': '大多',
                        'name7': '大多',

                    },
                    {
                        'date': '2017-04-20',
                        'schedule': '14:00~18:00',
                        'name1': 'ami',
                        'name2': 'ami',
                        'name3': 'ami',
                        'name4': '大ami多',
                        'name5': 'ami',
                        'name6': 'ami',
                        'name7': 'ami',
                    }
                ],
                addUser: false,
                editUser: false,
                addForm: {
                    'date': "",
                    'time': "",
                    'name': ""
                }
            }
        },
        methods: {
            queryBeforeWeek(){
                alert("上一周！")
            },
            queryNextWeek(){
                alert("下一周！")
            },
            resetForm(formName, dialog){
                this[dialog] = false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName, dialog){
                this[dialog] = false;
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
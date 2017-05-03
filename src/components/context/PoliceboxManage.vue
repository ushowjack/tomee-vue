<template>
    <div class="table-group">
        <div class="t-btn">
            <el-button>批量导出</el-button>
            <el-button @click="deleteAllSelection('userData')">批量删除</el-button>
            <el-button @click="addPoliceBox = true">添加岗亭</el-button>
        </div>
        <t-search></t-search>
        <el-table
                :data="userData"
                border
                tooltip-effect="dark"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                class="policebox">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="policeboxname"
                    label="岗亭名称">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="pobliceboxaddr"
                    label="岗亭位置">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="orgname"
                    label="单位">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="cameraid"
                    label="摄像头型号">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="remark"
                    label="备注">
            </el-table-column>
            <el-table-column
                    header-align="center"
                    fixed="right"
                    label="操作"
                    width="100">
                <template scope="scope">
                    <el-button @click.native.prevent="editTable(scope.$index,policeBoxData )"
                               type="text"
                               @click="editPoliceBox = true"
                               size="small">
                        修改
                    </el-button>
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index,policeBoxData )"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <t-pagination></t-pagination>

        <el-dialog
                title="添加岗亭"
                v-model="addPoliceBox"
                size="tiny"
                @close="resetForm('addForm','addPoliceBox')">
            <div class="dialog-context"
                 style="padding: 0 20px;margin-left: 180px;">
                <div class="upIMG">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                               list-type="picture-card"
                               :file-list="fileList"
                               :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <span style="width: 100%;text-align: center;">请选择添加头像</span>
                </div>

                <el-form
                        label-position="right"
                        label-width="120px"
                        :model="addForm"
                        ref="addForm">
                    <el-form-item label="岗亭名称："
                                  prop="policboxname">
                        <el-input v-model="addForm.policboxname">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="岗亭位置："
                                  prop="cameraid">
                        <el-input v-model="addForm.cameraid"></el-input>
                    </el-form-item>
                    <el-form-item label="摄像头型号："
                                  prop="remark">
                        <el-input
                                v-model="addForm.remark">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="所属大队：">
                        <div style="height: 46px;line-height: 46px;">{{department}}</div>
                    </el-form-item>
                    <el-form-item label="备注："
                                  prop="remark">
                        <el-input
                                v-model="addForm.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-form slot="footer">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addForm','addUser')">提交</el-button>
                    <el-button @click="addPoliceBox = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                title="修改岗亭"
                v-model="editPoliceBox"
                size="tiny">
            <div class="dialog-context"
                 style="padding: 0 20px;margin-left: 180px;">
                <div class="upIMG">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                               list-type="picture-card"
                               :file-list="fileList"
                               :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <span style="width: 100%;text-align: center;">请选择添加头像</span>
                </div>
                <el-form label-position="right" label-width="120px">
                    <el-form-item label="岗亭名称：">
                        <el-input v-model="policeBoxData[curIdx].policboxname"></el-input>
                    </el-form-item>
                    <el-form-item label="岗亭位置：">
                        <el-input v-model="policeBoxData[curIdx].policboxaddr"></el-input>
                    </el-form-item>
                    <el-form-item label="摄像头型号：">
                        <el-input v-model="policeBoxData[curIdx].cameraid"></el-input>
                    </el-form-item>
                    <el-form-item label="所属大队：">
                        <div style="height: 46px;line-height: 46px;">{{department}}</div>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="policeBoxData[curIdx].remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-form slot="footer">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addForm','editPoliceBox')">提交</el-button>
                    <el-button @click="editPoliceBox = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import Vue from "vue"
    import TSearch from "../table/search.vue"
    import TPagination from "../table/pagination.vue"

    export default {
        components: {
            TSearch,
            TPagination
        },
        data() {
            return {
                curIdx: 0,
                curRow: '',
                changeMSG: false,
                addPoliceBox: false,
                editPoliceBox: false,
                detailsDialog: false,
                department: '宝安大队',
                addForm: {
                    'policboxname': "",
                    'picture': "",
                    'policboxaddr': "",
                    'cameraid': "",
                    'remark': ""
                },
                policeBoxData: [
                    {
                        'policeboxname': 'strhdfging',//岗亭名称
                        'pobliceboxaddr': 'stfghhdring',//岗亭位置
                        'orgname': 'string',//单位
                        'cameraid': 'string',//摄像头的型号
                        'remark': 'string',//备注
                    },
                    {
                        'id': 'string',//id主键
                        'policeboxname': 'string',//岗亭名称
                        'picture': 'string',//岗亭照片
                        'pobliceboxaddr': 'string',//岗亭位置
                        'orgname': 'string',//单位
                        'cameraid': 'string',//摄像头的型号
                        'remark': 'string',//备注
                    },
                    {
                        'id': 'string',//id主键
                        'policeboxname': 'string',//岗亭名称
                        'picture': 'string',//岗亭照片
                        'pobliceboxaddr': 'string',//岗亭位置
                        'orgname': 'string',//单位
                        'cameraid': 'string',//摄像头的型号
                        'remark': 'string',//备注
                    },
                    {
                        'id': 'string',//id主键
                        'policeboxname': 'string',//岗亭名称
                        'picture': 'string',//岗亭照片
                        'pobliceboxaddr': 'string',//岗亭位置
                        'orgname': 'string',//单位
                        'cameraid': 'string',//摄像头的型号
                        'remark': 'string',//备注
                    }
                ],
                userData: [
                    {
                        'policeboxname': 'strhdfging',//岗亭名称
                        'pobliceboxaddr': 'stfghhdring',//岗亭位置
                        'orgname': 'string',//单位
                        'cameraid': 'string',//摄像头的型号
                        'remark': 'string',//备注
                    },
                    {
                        'policeboxname': 'strhdfging',//岗亭名称
                        'pobliceboxaddr': 'stfghhdring',//岗亭位置
                        'orgname': 'string',//单位
                        'cameraid': 'string',//摄像头的型号
                        'remark': 'string',//备注
                    },
                    {
                        'policeboxname': 'strhdfging',//岗亭名称
                        'pobliceboxaddr': 'stfghhdring',//岗亭位置
                        'orgname': 'string',//单位
                        'cameraid': 'string',//摄像头的型号
                        'remark': 'string',//备注
                    },
                    {
                        'policeboxname': 'strhdfging',//岗亭名称
                        'pobliceboxaddr': 'stfghhdring',//岗亭位置
                        'orgname': 'string',//单位
                        'cameraid': 'string',//摄像头的型号
                        'remark': 'string',//备注
                    },

                ],
                multipleSelection: [],
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            }
        },
        methods: {
            handleSelectionChange(val)
            {
                let Arr = [];
                val.forEach(function (el) {
                    Arr.push(el);
                })
                this.multipleSelection = Arr;
            },
            //            only use for userData ,this Array
            deleteAllSelection(data)
            {
                let _self = this;
//              获取剩下的值
                this[data] = this[data].filter(function (currentValue, currentIdx) {
                    let getItem = true;
                    _self.multipleSelection.forEach(function (val, idx) {
                        if (currentValue === val) {
                            getItem = false;
                        }
                    })
                    return getItem;
                });

            },
            editTable(index, rows){
                this.detailsDialog = true;
                this.curIdx = index;
                this.curRow = rows[index];
                this.changeMSG = false;
                console.log(this.curRow)
            },
            deleteRow(index, rows)
            {
                rows.splice(index, 1);
            },
            resetForm(formName, dialog)
            {
                this[dialog] = false;
                this.$refs[formName].resetFields();
                this.fileList = [];
            },
            submitForm(formName, dialog){
                this[dialog] = false;
            },
//            绑定详情对象和表格数据对象
            resetData(acceptData, giveData){
                let idx = this.curIdx;
                this[acceptData][idx].retiredtime = this[giveData][idx].retiredtime;
                this[acceptData][idx].retiredreason = this[giveData][idx].retiredreason;
                this[acceptData][idx].department = this[giveData][idx].department;
                this[acceptData][idx].serviceperformance = this[giveData][idx].serviceperformance;
                this[acceptData][idx].remark = this[giveData][idx].remark;
//                console.log(this.userData[idx])
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    @import "../../common/mixins/clearfix.less";
    .policebox tbody tr {
        height: auto;
    }
    .upIMG{
        width: 150px;
        position: absolute;
        top: 50px;
        left: 50px;
        text-align: center;
    }

</style>
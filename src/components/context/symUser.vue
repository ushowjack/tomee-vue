<template>
    <div class="table-group">
        <div class="t-btn">
            <el-button @click="deleteAllSelection('userData')">批量删除</el-button>
            <el-button @click="addUser = true">添加管理员</el-button>
        </div>
        <t-search @searchMsg="searchMsg"></t-search>
        <el-table
                :data="userData"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
        >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    type="index"
                    width="80">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="loginname"
                    label="用户登录名">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="department"
                    label="所属单位">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="authority"
                    label="用户的权限">
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
                    width="200">
                <template scope="scope">

                    <el-button @click.native.prevent="passwordReset(scope.$index, userData)"
                               type="text"
                               size="small">
                        密码重置
                    </el-button>
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, userData)"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <t-pagination :pageSize="pageSize"
                      :total="total"
                      @getPageEvent="getPageEvent">
        </t-pagination>
        <el-dialog
                title="添加管理员"
                v-model="addUser"
                size="tiny"
                @close="resetForm('addForm','addUser')">
            <div class="dialog-context"
                 style="position: relative; padding: 0 20px;">
                <el-form
                        label-position="right"
                        label-width="120px"
                        :rules="addFormRules"
                        :model="addForm"
                        ref="addForm">
                    <el-form-item label="系统用户名："
                                  prop="loginname"
                                  class="add">
                        <el-input v-model="addForm.loginname"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="所属单位："
                                  prop="department"
                                  class="add">
                        <el-select v-model="addForm.department"
                                   placeholder="请选择证件类型"
                                   class="add">
                            <el-option label="身份证" value="身份证"></el-option>
                            <el-option label="学生证" value="学生证"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码："
                                  prop="password"
                                  class="add">
                        <el-input type="password"
                                  v-model="addForm.password"
                                  auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="确认密码："
                                  prop="checkPassword"
                                  class="add">
                        <el-input type="password"
                                  v-model="addForm.checkPassword"
                                  auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="用户权限："
                                  prop="authority"
                                  class="add">
                        <el-input
                                v-model="addForm.authority"
                                type="authority"
                                auto-complete="off">

                        </el-input>
                    </el-form-item>
                    <el-form-item label="备注："
                                  prop="remark"
                                  class="add">
                        <el-input v-model="addForm.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-form slot="footer">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addForm','addUser')">提交</el-button>
                    <el-button @click="addUser = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                title="密码重置"
                v-model="resetPassword"
                size="tiny"
                @close="resetForm('resetPass','resetPassword')">
            <div class="dialog-context"
                 style="position: relative; padding: 0 20px;">
                <el-form
                        label-position="right"
                        label-width="120px"
                        :rules="resetFormRules"
                        :model="resetPass"
                        ref="resetPass">
                    <el-form-item label="用户名："
                                  class="add">
                        <el-input :disabled="true"
                                  v-model="resetPass.loginname">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码："
                                  prop="password"
                                  class="add">
                        <el-input type=""
                                  v-model="resetPass.password"
                                  auto-complete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="确认密码："
                                  prop="checkPassword"
                                  class="add">
                        <el-input type=""
                                  v-model="resetPass.checkPassword"
                                  auto-complete="off">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-form slot="footer">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('resetPass','resetPassword')">提 交</el-button>
                    <el-button @click="resetPassword = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--<el-dialog-->
        <!--title="密码重置"-->
        <!--v-model="resetPassword"-->
        <!--size="tiny"-->
        <!--@close="resetForm('addForm','resetPassword')">-->
        <!--<div class="dialog-context"-->
        <!--style="position: relative; padding: 0 20px;">-->
        <!--<el-form-->
        <!--label-position="right"-->
        <!--label-width="120px"-->
        <!--:rules="rules2"-->
        <!--:model="addForm"-->
        <!--ref="addForm">-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<el-form slot="footer">-->
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="submitForm('addForm','resetPassword')">提 交</el-button>-->
        <!--<el-button @click="resetForm('addForm','resetPassword')">取 消</el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</el-dialog>-->

    </div>
</template>
<script type="text/ecmascript-6">

    var REST_MAIN = '/api/';
    var REST_SymUser_Index = REST_MAIN + 'User/Index';
    var REST_SymUser_Search = REST_MAIN + 'User/Index';
    var REST_SymUser_Delete = REST_MAIN + 'User/Delete';


    import TSearch from "../table/search.vue"
    import TPagination from "../table/pagination.vue"
    import axios from "axios"
    import qs from 'qs'
    //    import fetch from '../../utils/fetch'

    export default {
        components: {
            TSearch,
            TPagination
        },

        data() {
            var addPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.addForm.checkPassword !== '') {
                        this.$refs.addForm.validateField('checkPassword');
                    }
                    callback();
                }
            };
            var addPass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var resetPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.resetPass.checkPassword !== '') {
                        this.$refs.resetPass.validateField('checkPassword');
                    }
                    callback();
                }
            };
            var resetPass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.resetPass.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                search: '',
                currentPage: 1,
                pageSize: 10,
                total: 1,
                addFormRules: {
                    password: [
                        {validator: addPass, trigger: 'blur'}
                    ],
                    checkPassword: [
                        {validator: addPass2, trigger: 'blur'}
                    ]
                },
                resetFormRules: {
                    password: [
                        {validator: resetPass, trigger: 'blur'}
                    ],
                    checkPassword: [
                        {validator: resetPass2, trigger: 'blur'}
                    ]
                },
                curIdx: 0,
                curRow: '',
                changeMSG: false,
                addUser: false,
                resetPassword: false,
                resetPass: {
                    'password': "",
                    'checkPassword': ""
                },
                addForm: {
                    'loginname': "",     //用户登录名
                    'authority': "",         //用户权限
                    'department': "",        //用户所属单位
                    'remark': "",           //备注
                    'password': "",
                    'checkPassword': ""
                },
                userData: [],
                personMoreData: [
                    {
                        'name': "sfgg",                      //姓名
                        'pid': "varchar",                      //证件号
                        'pidtype': "身份证",                     //证件类型
                        'birth': "date",                     //出生日期
                        'military': "date",                  //入伍时间
                        'nation': "int",                      //名族
                        'level': "int",                      //警衔
                        'duty': "int",                       //职务
                        'property': "int",                   //人员性质
                        'sex': "int",                         //性别
                        'nativeplace': "varchar",            //籍贯
                        'department': "varchar",            //所属单位
                        'cpxondition': "int",              //人员当前状态
                        'picturepath': "varchar",          //人员照片
                        'remark': "text",                 //备注
                    },
                    {
                        'name': "gsgsg",                      //姓名
                        'pid': "varchar",                      //证件号
                        'pidtype': "身份证",                     //证件类型
                        'birth': "date",                     //出生日期
                        'military': "date",                  //入伍时间
                        'nation': "int",                      //名族
                        'level': "int",                      //警衔
                        'duty': "int",                       //职务
                        'property': "int",                   //人员性质
                        'sex': "int",                         //性别
                        'nativeplace': "varchar",            //籍贯
                        'department': "varchar",            //所属单位
                        'cpxondition': "int",              //人员当前状态
                        'picturepath': "varchar",          //人员照片
                        'remark': "text",                 //备注
                    },
                    {
                        'name': "sdgfa",                      //姓名
                        'pid': "varchar",                      //证件号
                        'pidtype': "身份证",                     //证件类型
                        'birth': "date",                     //出生日期
                        'military': "date",                  //入伍时间
                        'nation': "int",                      //名族
                        'level': "int",                      //警衔
                        'duty': "int",                       //职务
                        'property': "int",                   //人员性质
                        'sex': "int",                         //性别
                        'nativeplace': "varchar",            //籍贯
                        'department': "varchar",            //所属单位
                        'cpxondition': "int",              //人员当前状态
                        'picturepath': "varchar",          //人员照片
                        'remark': "text",                 //备注
                    },
                    {
                        'name': "fas",                      //姓名
                        'pid': "varchar",                      //证件号
                        'pidtype': "身份证",                     //证件类型
                        'birth': "date",                     //出生日期
                        'military': "date",                  //入伍时间
                        'nation': "int",                      //名族
                        'level': "int",                      //警衔
                        'duty': "int",                       //职务
                        'property': "int",                   //人员性质
                        'sex': "int",                         //性别
                        'nativeplace': "varchar",            //籍贯
                        'department': "varchar",            //所属单位
                        'cpxondition': "int",              //人员当前状态
                        'picturepath': "varchar",          //人员照片
                        'remark': "text",                 //备注
                    },
                    {
                        'name': "sgs",                      //姓名
                        'pid': "varchar",                      //证件号
                        'pidtype': "身份证",                     //证件类型
                        'birth': "date",                     //出生日期
                        'military': "date",                  //入伍时间
                        'nation': "int",                      //名族
                        'level': "int",                      //警衔
                        'duty': "int",                       //职务
                        'property': "int",                   //人员性质
                        'sex': "int",                         //性别
                        'nativeplace': "varchar",            //籍贯
                        'department': "varchar",            //所属单位
                        'cpxondition': "int",              //人员当前状态
                        'picturepath': "varchar",          //人员照片
                        'remark': "text",                 //备注
                    },
                ],
                multipleSelection: []
            }
        },
        created(){
            axios.get(REST_SymUser_Index)
                .then(res => {
                    this.userData = res.data.data;
                    this.total = res.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            getPage(page, url){
                const getSearch = this.search ? `search/${this.search}` : '';
                axios.get(`${url}/p/${page}/${getSearch}`)
                    .then(res => {
                        this.userData = res.data.data;
                        this.total = res.data.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getPageEvent(page){
                this.getPage(page, REST_SymUser_Index);
            },
            searchMsg(val){
                this.search = val;
                axios.post(REST_SymUser_Search, qs.stringify({
                    search: val
                })).then(res => {
//                    console.log(response.data);
//                    console.log(_self.userData)
                    this.currentPage = 1;
                    if (res.data.state === '4010100') {
                        this.userData = [];
                        this.total = 10;
                    } else {
                        this.userData = res.data.data;
                        this.total = res.data.total;
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            },
            deleteRow(index, rows){
                this.$confirm('此操作将永久删除选中人员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(REST_SymUser_Delete, qs.stringify({
                            deleteName: rows[index].loginname
                        })
                    ).then(res => {
                        this.getPageEvent(this.currentPage);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(error => {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //get the selection
            handleSelectionChange(val) {
                let Arr = [];
                val.forEach(function (el) {
                    Arr.push(el);
                })
                this.multipleSelection = Arr;
//                console.log(this.multipleSelection);
            },
            //get the unselected option and set it
            deleteAllSelectionFn(data){
//                console.log(this.multipleSelection);
//              获取剩下的值
                let DATA_LEN = this[data].length;
                let MS_LEN = this.multipleSelection.length
                let Arr = [];
//              get the different value
                for (let i = 0; i < DATA_LEN; i++) {
                    let getObj = true;
                    for (let j = 0; j < MS_LEN; j++) {
                        if (this[data][i] === this.multipleSelection[j]) {
                            getObj = false;
                        }
                    }
                    if (getObj) {
                        Arr.push(this[data][i]);
                    }
                }
//                console.log(Arr);
//                over here is no problem
                if (MS_LEN !== DATA_LEN) {
                    this[data] = Arr;
                } else {
                    this[data] = [];
                }
            },

            //be a proxy for the delete function
            deleteAllSelection(data){
                let selectionArr = [];
                this.multipleSelection.forEach(function (val) {
                    selectionArr.push(val.loginname)
                });
                if (!selectionArr.length) {
                    this.$message({
                        showClose: true,
                        message: '请选择需要删除的人员',
                        type: 'warning'
                    });
                    return false;
                }
                this.$confirm('此操作将永久删除所有选中人员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(REST_SymUser_Delete, qs.stringify({
                            deleteName: selectionArr
                        })
                    ).then(res => {
//                            console.log(response)
                        if (res.data.state === '402100') {
                            this.getPageEvent(this.currentPage);
                            this.$message({
                                message: res.data.msg
                            });
                        } else {
                            this.deleteAllSelectionFn(data);
                            this.$message({
                                type: 'success',
                                message: res.data.msg
                            });
                            this.getPageEvent(this.currentPage);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },


            //only use for userData ,this Array
            passwordReset(index, rows){
                this.resetPassword = true;
                this.resetPass.loginname = rows[index].loginname;
            },
//          control the modal show
            handleEdit(index, row){
                this.curIdx = index;
                this.curRow = row;
                this.addUser = true;
                this.changeMSG = false;
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

<style lang="less" rel="stylesheet/less">
    @import "../../common/mixins/clearfix.less";

    .table-group {
        width: 90%;
        margin: 20px auto;
        background-color: #fff;

    }

    .t-btn {
        float: left;
        padding: 20px 10px;
    }

    .t-search {
        width: 200px;
        float: right;
        padding: 10px;
    }

    tbody tr {
        height: 50px;
        line-height: 50px;
    }

    thead {
        .caret-wrapper {
            float: right;
        }
        height: 60px;
        line-height: 60px;
        th.el-table_1_column_1.is-leaf {
            font-weight: normal;
            font-size: 16px;
        }
        .cell {
            height: 32px;
            line-height: 32px !important;
            span {
                padding: 0;
                margin: 0 !important;
            }
            /*text-align: center!important;*/
        }
    }

    .dialog-context {

        input {
            margin: 4px 0;
        }
        span {
            display: inline-block;
            width: 40%;
            padding: 5px;
            line-height: 20px;
            &:first-child {
                text-align: right;
            }
            &:last-child {
                text-align: left;
            }
        }
    }

    .el-dialog {
        min-width: 500px;
        .el-dialog__body {
            padding-bottom: 0;
        }
    }

    .el-form-item.add {
        margin-bottom: 20px !important;
        .el-form-item__content {
            text-align: left;
            .el-select {
                width: 100%;
            }
        }
        .el-form-item__label {
            margin: 5px 0;
        }
    }


</style>
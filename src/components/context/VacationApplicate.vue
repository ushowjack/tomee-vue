<template>
    <div class="table-group">
        <div class="t-btn">
            <el-button @click="deleteAllSelection('userData')">批量删除</el-button>
            <el-button @click="addUser = true">添加休假申请</el-button>
        </div>
        <t-search></t-search>
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
                    width="50">
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
        <t-pagination></t-pagination>

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
                        :rules="rules2"
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
                @close="resetForm('addForm','resetPassword')">
            <div class="dialog-context"
                 style="position: relative; padding: 0 20px;">
                <el-form
                        label-position="right"
                        label-width="120px"
                        :rules="rules2"
                        :model="addForm"
                        ref="addForm">
                </el-form>
            </div>
            <el-form slot="footer">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('addForm','resetPassword')">提 交</el-button>
                    <el-button @click="resetForm('addForm','resetPassword')">取 消</el-button>
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
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.addForm.checkPassword !== '') {
                        this.$refs.addForm.validateField('checkPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                rules2: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPassword: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                },
                curIdx: 0,
                curRow: '',
                changeMSG: false,
                addUser: false,
                resetPassword: false,
                btnData: [
                    {
                        value: "批量删除"
                    },
                    {
                        value: "添加管理员"
                    },
                ],
                addForm: {
                    'loginname': "",     //用户登录名
                    'authority': "",         //用户权限
                    'department': "",        //用户所属单位
                    'remark': "",           //备注
                    'password': "",
                    'checkPassword': ""
                },
                userData: [
                    {
                        'loginname': "1",     //用户登录名
                        'authority': "werye",         //用户权限
                        'department': "rhgwe",        //用户所属单位
                        'remark': "whgeh",           //备注
                    },
                    {
                        'loginname': "2",     //用户登录名
                        'authority': "werye",         //用户权限
                        'department': "rhgwe",        //用户所属单位
                        'remark': "whgeh",           //备注
                    },
                    {
                        'loginname': "3",     //用户登录名
                        'authority': "werye",         //用户权限
                        'department': "rhgwe",        //用户所属单位
                        'remark': "whgeh",           //备注
                    },
                    {
                        'loginname': "4",     //用户登录名
                        'authority': "werye",         //用户权限
                        'department': "rhgwe",        //用户所属单位
                        'remark': "whgeh",           //备注
                    },
                ],
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
        methods: {
            handleSelectionChange(val) {
                let Arr = [];
                val.forEach(function (el) {
                    Arr.push(el);
                })
                this.multipleSelection = Arr;
//                console.log(this.multipleSelection);
            },
            //            only use for userData ,this Array
            deleteAllSelection(data){
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
            passwordReset(index, rows){
                this.resetPassword = true;
            },
//          control the modal show
            handleEdit(index, row){
                this.curIdx = index;
                this.curRow = row;
                this.addUser = true;
                this.changeMSG = false;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            resetForm(formName,dialog){
                this[dialog] = false;
                this.$refs[formName].resetFields();
            },
            submitForm(formName,dialog){
                this[dialog] = false;
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>
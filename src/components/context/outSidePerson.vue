<template>
    <div class="table-group">
        <div class="t-btn">
            <el-button @click="deleteAllSelection('userData')">批量删除</el-button>
            <el-button @click="addUser = true">申请外出</el-button>
        </div>
        <t-search></t-search>
        <el-table
                :data="userData"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
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
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="retiredtime"
                    label="退伍时间">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="retiredreason"
                    label="退伍原因">
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
                    prop="serviceperformance"
                    label="服役表现">
            </el-table-column>
            <el-table-column
                    header-align="center"
                    fixed="right"
                    label="操作"
                    width="150">
                <template scope="scope">
                    <el-button @click.native.prevent="detailsWatch(scope.$index, userData)"
                               type="text"
                               size="small">
                        查看详细
                    </el-button>
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
                title="申请外出"
                v-model="addUser"
                size="tiny"
                @close="resetForm('addForm','addUser')">
            <div class="dialog-context"
                 style="position: relative; padding: 0 20px;">
                <el-form
                        label-position="right"
                        label-width="120px"
                        :model="addForm"
                        ref="addForm">
                    <el-form-item label="申请人姓名："
                                  prop="name"
                                  class="outer">
                        <el-input v-model="addForm.name">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="证件号："
                                  prop="pid"
                                  class="outer">
                        <el-input v-model="addForm.pid"></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位："
                                  prop="orgid"
                                  class="outer">
                        <el-input v-model="addForm.orgid"></el-input>
                    </el-form-item>
                    <el-form-item label="外出时间："
                                  prop="outtime"
                                  class="outer">
                        <el-input
                                v-model="addForm.outtime">

                        </el-input>
                    </el-form-item>
                    <el-form-item label="归队时间："
                                  prop="precometime"
                                  class="outer">
                        <el-input
                                v-model="addForm.precometime">

                        </el-input>
                    </el-form-item>
                    <el-form-item label="外出原因："
                                  prop="outreason"
                                  class="outer">
                        <el-input
                                v-model="addForm.outreason">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="备注："
                                  prop="remark"
                                  class="outer">
                        <el-input
                                v-model="addForm.remark">
                        </el-input>
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
                :title="`${curRow.name}的详情资料`"
                v-model="detailsDialog"
                size="tiny"
                @close="resetData('userData','personMoreData')">
            <div class="dialog-context"
                 style="position: relative; padding: 20px;"
                 v-if="changeMSG">
                <el-form label-position="right" label-width="120px">
                    <el-form-item label="证件号：">
                        <el-input v-model="personMoreData[curIdx].pid"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型：">
                        <el-select v-model="personMoreData[curIdx].pidtype" placeholder="请选择证件类型">
                            <el-option label="身份证" value="身份证"></el-option>
                            <el-option label="学生证" value="学生证"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期：">
                        <el-input v-model="personMoreData[curIdx].birth"></el-input>
                    </el-form-item>
                    <el-form-item label="入伍时间：">
                        <el-input v-model="personMoreData[curIdx].military"></el-input>
                    </el-form-item>
                    <el-form-item label="民族：">
                        <el-input v-model="personMoreData[curIdx].nation"></el-input>
                    </el-form-item>
                    <el-form-item label="警衔：">
                        <el-input v-model="personMoreData[curIdx].level"></el-input>
                    </el-form-item>
                    <el-form-item label="职务：">
                        <el-input v-model="personMoreData[curIdx].duty"></el-input>
                    </el-form-item>
                    <el-form-item label="人员性质：">
                        <el-input v-model="personMoreData[curIdx].property"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <el-input v-model="personMoreData[curIdx].sex"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯：">
                        <el-input v-model="personMoreData[curIdx].nativeplace"></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位：">
                        <el-input v-model="personMoreData[curIdx].department"></el-input>
                    </el-form-item>
                    <el-form-item label="人员当前状态：">
                        <el-input v-model="personMoreData[curIdx].cpxondition"></el-input>
                    </el-form-item>
                    <el-form-item label="退伍时间：">
                        <el-input v-model="personMoreData[curIdx].retiredtime"></el-input>
                    </el-form-item>
                    <el-form-item label="退伍原因：">
                        <el-input v-model="personMoreData[curIdx].retiredreason"></el-input>
                    </el-form-item>
                    <el-form-item label="服役表现：">
                        <el-input v-model="personMoreData[curIdx].serviceperformance"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog-context"
                 style="position: relative; padding: 20px;"
                 v-else>
                <div class="leftSide">
                    <div class="textBox">
                        <div>
                            <span>证件号：</span>
                            <span>{{personMoreData[curIdx].pid}}</span>
                        </div>
                        <div>
                            <span>证件类型：</span>
                            <span>{{personMoreData[curIdx].pidtype}}</span>
                        </div>
                        <div>
                            <span>出生日期：</span>
                            <span>{{personMoreData[curIdx].birth}}</span>
                        </div>
                        <div>
                            <span>入伍时间：</span>
                            <span>{{personMoreData[curIdx].military}}</span>
                        </div>
                        <div>
                            <span>民族：</span>
                            <span>{{personMoreData[curIdx].nation}}</span>
                        </div>
                        <div>
                            <span>警衔：</span>
                            <span>{{personMoreData[curIdx].level}}</span>
                        </div>
                        <div>
                            <span>职务：</span>
                            <span>{{personMoreData[curIdx].duty}}</span>
                        </div>
                        <div>
                            <span>人员性质：</span>
                            <span>{{personMoreData[curIdx].property}}</span>
                        </div>
                        <div>
                            <span>性别：</span>
                            <span>{{personMoreData[curIdx].sex}}</span>
                        </div>
                        <div>
                            <span>籍贯：</span>
                            <span>{{personMoreData[curIdx].nativeplace}}</span>
                        </div>
                        <div>
                            <span>退伍时间：</span>
                            <span>{{personMoreData[curIdx].retiredtime}}</span>
                        </div>
                        <div>
                            <span>退伍原因：</span>
                            <span>{{personMoreData[curIdx].retiredreason}}</span>
                        </div>
                    </div>
                </div>
                <div class="rightSide">
                    <div class="imgBox"
                         style="width: 150px;height: 200px;background-color: #dddddd;">
                    </div>
                    <div>
                        <span>服役表现：</span>
                        <span>{{personMoreData[curIdx].serviceperformance}}</span>
                    </div>
                    <div>
                        <span>所属单位：</span>
                        <span>{{personMoreData[curIdx].department}}</span>
                    </div>
                    <div>
                        <span>人员当前状态：</span>
                        <span>{{personMoreData[curIdx].cpxondition}}</span>
                    </div>
                    <div>
                        <span>备注：</span>
                        <span>{{personMoreData[curIdx].remark}}</span>
                    </div>
                </div>
            </div>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="detailsDialog = false">
                    取 消
                </el-button>
                <el-button type="primary"
                           v-if="changeMSG"
                           @click="detailsDialog = false">
                    提 交
                </el-button>
                <el-button type="primary"
                           v-else
                           @click="changeMSG = true">
                    修 改
                </el-button>
            </div>
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
                addUser: false,
                detailsDialog: false,
                btnData: [
                    {
                        value: "批量删除"
                    },
                    {
                        value: "添加管理员"
                    },
                ],
                addForm: {
                    'name': "",     //用户登录名
                    'pid': "",         //用户权限
                    'orgid': "",        //用户所属单位
                    'outtime': "",           //备注
                    'precometime': "",
                    'outreason': "",
                    'remark': ""
                },
                userData: [
                    {
                        'name': 'varchar',          //姓名
                        'retiredtime': 'date',      //退伍时间
                        'retiredreason': 'text',    //退伍原因
                        'department': 'varchar',     //所属单位
                        'serviceperformance': 'text',//服役表现
                        'remark': 'text',             //备注
                    },
                    {
                        'name': 'varchar',          //姓名
                        'retiredtime': 'date',      //退伍时间
                        'retiredreason': 'text',    //退伍原因
                        'department': 'varchar',     //所属单位
                        'serviceperformance': 'text',//服役表现
                        'remark': 'text',             //备注
                    },
                    {
                        'name': 'varchar',          //姓名
                        'retiredtime': 'date',      //退伍时间
                        'retiredreason': 'text',    //退伍原因
                        'department': 'varchar',     //所属单位
                        'serviceperformance': 'text',//服役表现
                        'remark': 'text',             //备注
                    },
                    {
                        'name': 'varchar',          //姓名
                        'retiredtime': 'date',      //退伍时间
                        'retiredreason': 'text',    //退伍原因
                        'department': 'varchar',     //所属单位
                        'serviceperformance': 'text',//服役表现
                        'remark': 'text',             //备注
                    },
                    {
                        'name': 'varchar',          //姓名
                        'retiredtime': 'date',      //退伍时间
                        'retiredreason': 'text',    //退伍原因
                        'department': 'varchar',     //所属单位
                        'serviceperformance': 'text',//服役表现
                        'remark': 'text',             //备注
                    }
                ],
                personMoreData: [
                    {
                        'name': "varchar",                      //姓名
                        'pid': "varchar",                      //证件号
                        'pidtype': "int",                     //证件类型
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
                        'retiredtime': "date",            //退伍时间
                        'retiredreason': "text",          //退伍原因
                        'serviceperformance': "text",       //服役表现
                    },
                    {
                        'name': "varchar",                      //姓名
                        'pid': "varchar",                      //证件号
                        'pidtype': "int",                     //证件类型
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
                        'retiredtime': "date",            //退伍时间
                        'retiredreason': "text",          //退伍原因
                        'serviceperformance': "text",       //服役表现
                    },
                    {
                        'name': "varchar",                      //姓名
                        'pid': "varchar",                      //证件号
                        'pidtype': "int",                     //证件类型
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
                        'retiredtime': "date",            //退伍时间
                        'retiredreason': "text",          //退伍原因
                        'serviceperformance': "text",       //服役表现
                    },
                    {
                        'name': "varchar",                      //姓名
                        'pid': "varchar",                      //证件号
                        'pidtype': "int",                     //证件类型
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
                        'retiredtime': "date",            //退伍时间
                        'retiredreason': "text",          //退伍原因
                        'serviceperformance': "text",       //服役表现
                    }

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
            detailsWatch(index, rows){
                this.detailsDialog = true;
                this.curIdx = index;
                this.curRow = rows[index];
                this.changeMSG = false;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            resetForm(formName, dialog){
                this[dialog] = false;
                this.$refs[formName].resetFields();
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
            }
        },
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
        .outer{
            width: 50%;
            float: left;
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
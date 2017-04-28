<template>
    <div class="table-group">
        <div class="t-btn">
            <el-button @click="deleteAllSelection">批量删除</el-button>
            <el-button @click="addPerson = true">添加人员</el-button>
            <el-button>批量添加</el-button>
        </div>
        <t-search></t-search>
        <el-table
                :data="personMoreData"
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
                    prop="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="pid"
                    label="证件号">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="sex"
                    width="120"
                    label="性别">
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
                    prop="duty"
                    label="职务">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    fixed="right"
                    label="操作"
                    width="150">
                <template scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, personMoreData)"
                            type="text"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <t-pagination></t-pagination>

        <el-dialog
                :title="curRow.name + '的详情资料'"
                v-model="dialogVisible"
                size="tiny">
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
                    <el-form-item label="备注：">
                        <el-input v-model="personMoreData[curIdx].remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog-context"
                 style="position: relative; padding: 20px;"
                 v-else>
                <div class="leftSide">
                    <div class="textBox">
                        <div>
                            <span>姓名：</span>
                            <span>{{personMoreData[curIdx].name}}</span>
                        </div>
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

                    </div>
                </div>
                <div class="rightSide">
                    <div class="imgBox"
                         style="width: 150px;height: 200px;background-color: #dddddd;">
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
                <el-button @click="dialogVisible = false">
                    取 消
                </el-button>
                <el-button type="primary"
                           v-if="changeMSG"
                           @click="dialogVisible = false">
                    提 交
                </el-button>
                <el-button type="primary"
                           v-else
                           @click="changeMSG = true">
                    修 改
                </el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="添加人员信息"
                v-model="addPerson"
                @close="resetForm('personData')"
                size="tiny">
            <div class="dialog-context"
                 style="position: relative; padding: 20px;">
                <el-form label-position="right"
                         label-width="120px"
                         :model="personData"
                         ref="personData">
                    <el-form-item label="姓名：">
                        <el-input v-model="personData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号：">
                        <el-input v-model="personData.pid"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型：">
                        <el-select v-model="personData.pidtype" placeholder="请选择证件类型">
                            <el-option label="身份证" value="身份证"></el-option>
                            <el-option label="学生证" value="学生证"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期：">
                        <el-input v-model="personData.birth"></el-input>
                    </el-form-item>
                    <el-form-item label="入伍时间：">
                        <el-input v-model="personData.military"></el-input>
                    </el-form-item>
                    <el-form-item label="民族：">
                        <el-input v-model="personData.nation"></el-input>
                    </el-form-item>
                    <el-form-item label="警衔：">
                        <el-input v-model="personData.level"></el-input>
                    </el-form-item>
                    <el-form-item label="职务：">
                        <el-input v-model="personData.duty"></el-input>
                    </el-form-item>
                    <el-form-item label="人员性质：">
                        <el-input v-model="personData.property"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <el-input v-model="personData.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯：">
                        <el-input v-model="personData.nativeplace"></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位：">
                        <el-input v-model="personData.department"></el-input>
                    </el-form-item>
                    <el-form-item label="人员当前状态：">
                        <el-input v-model="personData.cpxondition"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="personData.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-form slot="footer"
                     class="dialog-footer">
                <el-form-item>
                    <el-button type="primary"
                               @click="submitForm('personData')">
                        提 交
                    </el-button>
                    <el-button @click="addPerson = false">
                        取 消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>

</template>

<script>
    import TSearch from "./search.vue"
    import TBtn from "./button.vue"
    import TPagination from "./pagination.vue"


    export default {
        components: {
            TSearch,
            TBtn,
            TPagination
        },

        data() {
            return {
                curIdx: 0,
                curRow: '',
                changeMSG: false,
                dialogVisible: false,
                addPerson: false,
                btnData: [
                    {
                        value: "批量删除"
                    },
                    {
                        value: "添加人员"
                    },
                    {
                        value: "批量添加"
                    }
                ],
                personData: {
                    'name': "",                      //姓名
                    'pid': "",                      //证件号
                    'pidtype': "",                     //证件类型
                    'birth': "",                     //出生日期
                    'military': "",                  //入伍时间
                    'nation': "",                      //名族
                    'level': "",                      //警衔
                    'duty': "",                       //职务
                    'property': "",                   //人员性质
                    'sex': "",                         //性别
                    'nativeplace': "",            //籍贯
                    'department': "",            //所属单位
                    'cpxondition': "",              //人员当前状态
                    'picturepath': "",          //人员照片
                    'remark': ""                 //备注
                },
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
        }
        ,
        methods: {
            deleteAllSelection(){
                let _self = this;
//              获取剩下的值
                this.personMoreData = this.personMoreData.filter(function (currentValue, currentIdx) {
                    let getItem = true;
                    _self.multipleSelection.forEach(function (val, idx) {
                        if (currentValue === val) {
                            getItem = false;
                        }
                    })
                    return getItem;
                });
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
//          control the modal show
            handleEdit(index, row){
                this.curIdx = index;
                this.curRow = row;
                this.dialogVisible = true;
                this.changeMSG = false;
            },
            deleteRow(index, rows){
                rows.splice(index, 1);
            },
            resetForm(formName){
                this.addPerson = false;
//                解决在未知情况下无法获取Fields
                console.log(this.$refs[formName]);

                for (let val in this.$refs[formName].model) {
                    this.personData[val] = "";
                }
            },
            submitForm(formName){
                this.addPerson = false;
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
        .clearfix();
        div {
            .clearfix();
        }
        .leftSide {
            width: 50%;
            float: left;
        }
        .rightSide {
            width: 50%;
            float: right;

            .imgBox {
                margin: 10px auto 30px;
            }
        }
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
    }

    .el-form-item {
        .el-form-item__content {
            text-align: left;
            .el-select {
                width: 100%;
            }
            button {
                float: right;
                padding: 10px;
                margin: 0 10px;
                span {
                    line-height: 14px;
                    width: 100%;
                    padding: 0;
                }
            }
        }
        .el-form-item__label {
            margin: 5px 0;
        }
    }


</style>
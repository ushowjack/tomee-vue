<template>
    <div class="table-group">
        <t-btn :btnData="btnData"></t-btn>
        <t-search></t-search>
        <el-table
                :data="personData"
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
                            @click.native.prevent="deleteRow(scope.$index, personData)"
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
                personData: [
                    {
                        name: '王小虎',
                        pid: 123154646148,
                        sex: '男',
                        duty: '码农',
                        department: '桃木科技'
                    },
                    {
                        name: '王小虎',
                        pid: 123154646148,
                        sex: '男',
                        duty: '码农',
                        department: '桃木科技'
                    },
                    {
                        name: '王小虎',
                        pid: 123154646148,
                        sex: '男',
                        duty: '码农',
                        department: '桃木科技'
                    },
                    {
                        name: '王小虎',
                        pid: 123154646148,
                        sex: '男',
                        duty: '码农',
                        department: '桃木科技'
                    },
                    {
                        name: '王小虎',
                        pid: 123154646148,
                        sex: '男',
                        duty: '码农',
                        department: '桃木科技'
                    },
                    {
                        name: '王小虎',
                        pid: 123154646148,
                        sex: '男',
                        duty: '码农',
                        department: '桃木科技'
                    },
                    {
                        name: '王小虎',
                        pid: 123154646148,
                        sex: '男',
                        duty: '码农',
                        department: '桃木科技'
                    },
                    {
                        name: '王小虎',
                        pid: 123154646148,
                        sex: '男',
                        duty: '码农',
                        department: '桃木科技'
                    }
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
                this.multipleSelection = val;
            },
//          control the modal show
            handleEdit(index, row){
                this.curIdx = index;
                this.curRow = row;
                this.dialogVisible = true;
                this.changeMSG = false;
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
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
        margin-bottom: 0 !important;
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
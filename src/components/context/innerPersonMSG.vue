<template>
    <div class="table-group">
        <div class="t-btn">
            <el-button @click="deleteAllSelection('userData')">批量删除</el-button>
            <el-button @click="addPersonFn">添加人员</el-button>
            <el-button>批量添加</el-button>
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
                    prop="birth"
                    label="出生日期">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="dutyname"
                    label="职务">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="sex"
                    label="性别">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    fixed="right"
                    label="操作"
                    width="150">
                <template scope="scope">
                    <el-button @click="detailMore(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
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
                :title="curRow.name + '的详情资料'"
                v-model="dialogVisible"
                size="tiny">
            <div class="dialog-context"
                 style="position: relative; padding: 20px;"
                 v-if="changeMSG">

                <el-form label-position="right" label-width="120px">
                    <el-form-item label="证件号：">
                        <el-input v-model="personEditData.pid"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型：">
                        <template>
                            <el-select v-model="submitPidType" placeholder="请选择证件类型">
                                <el-option :label="item.label"
                                           :key="item.value"
                                           :value="item.value"
                                           v-for="item in personEditData.pidtype"
                                           :selected="item.selected">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="出生日期：">
                        <el-input v-model="personEditData.birth"></el-input>
                    </el-form-item>
                    <el-form-item label="入伍时间：">
                        <el-input v-model="personEditData.military"></el-input>
                    </el-form-item>
                    <el-form-item label="民族：">
                        <el-select v-model="submitNation" placeholder="请选择民族">
                            <el-option :label="item.label"
                                       :key="item.value"
                                       :value="item.value"
                                       v-for="item in personEditData.nation">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="警衔：">
                        <el-select v-model="submitLevel" placeholder="请选择警衔">
                            <el-option :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                                       v-for="item in personEditData.level"
                                       :selected="item.selected">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职务：">
                        <el-select v-model="submitDuty" placeholder="请选择职务">
                            <el-option :label="item.label"
                                       :key="item.value"
                                       :value="item.value"
                                       v-for="item in personEditData.duty"
                                       :selected="item.selected">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人员性质：">
                        <el-select v-model="submitProperty" placeholder="请选择人员性质">
                            <el-option :label="item.label"
                                       :key="item.value"
                                       :value="item.value"
                                       v-for="item in personEditData.property"
                                       :selected="item.selected">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <el-input v-model="personEditData.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯：">
                        <el-input v-model="personEditData.nativeplace"></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位：">
                        <el-input v-model="personEditData.department"></el-input>
                    </el-form-item>
                    <el-form-item label="人员当前状态：">
                        <el-input v-model="personEditData.cpxondition"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model="personEditData.remark"></el-input>
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
                            <span>{{personMoreData.name}}</span>
                        </div>
                        <div>
                            <span>证件号：</span>
                            <span>{{personMoreData.pid}}</span>
                        </div>
                        <div>
                            <span>证件类型：</span>
                            <span v-if="personMoreData.pidtype">{{personMoreData.pidtype.label}}</span>
                        </div>
                        <div>
                            <span>出生日期：</span>
                            <span>{{personMoreData.birth}}</span>
                        </div>
                        <div>
                            <span>入伍时间：</span>
                            <span>{{personMoreData.military}}</span>
                        </div>
                        <div>
                            <span>民族：</span>
                            <span v-if="personMoreData.nation">{{personMoreData.nation.label}}</span>
                        </div>
                        <div>
                            <span>警衔：</span>
                            <span v-if="personMoreData.level">{{personMoreData.level.label}}</span>

                        </div>
                        <div>
                            <span>职务：</span>
                            <span v-if="personMoreData.duty">{{personMoreData.duty.label}}</span>
                        </div>
                        <div>
                            <span>人员性质：</span>
                            <span v-if="personMoreData.property">{{personMoreData.property.label}}</span>
                        </div>
                        <div>
                            <span>性别：</span>
                            <span>{{personMoreData.sex}}</span>
                        </div>
                        <div>
                            <span>籍贯：</span>
                            <span>{{personMoreData.nativeplace}}</span>
                        </div>

                    </div>
                </div>
                <div class="rightSide">
                    <div class="imgBox"
                         style="width: 150px;height: 200px;background-color: #dddddd;">
                    </div>
                    <div>
                        <span>所属单位：</span>
                        <span>{{personMoreData.orgname}}</span>
                    </div>
                    <div>
                        <span>人员当前状态：</span>
                        <span v-if="personMoreData.cpxondition">{{personMoreData.cpxondition}}</span>
                        <span v-else>无</span>
                    </div>
                    <div>
                        <span>备注：</span>
                        <span v-if="personMoreData.remark">{{personMoreData.remark}}</span>
                        <span v-else>无备注</span>
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
                           @click="submitEditForm">
                    提 交
                </el-button>
                <el-button type="primary"
                           v-else
                           @click="editDetailFn">
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
                        <el-select v-model="submitPidType" placeholder="请选择证件类型">
                            <el-option :label="item.label"
                                       :key="item.value"
                                       :value="item.value"
                                       v-for="item in personData.pidtype"
                                       :selected="item.selected">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期：">
                        <el-input v-model="personData.birth"></el-input>
                    </el-form-item>
                    <el-form-item label="入伍时间：">
                        <el-input v-model="personData.military"></el-input>
                    </el-form-item>
                    <el-form-item label="民族：">
                        <el-select v-model="submitNation" placeholder="请选择民族">
                            <el-option :label="item.label"
                                       :key="item.value"
                                       :value="item.value"
                                       v-for="item in personData.nation">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="警衔：">
                        <el-select v-model="submitLevel" placeholder="请选择警衔">
                            <el-option :label="item.label"
                                       :value="item.value"
                                       :key="item.value"
                                       v-for="item in personData.level"
                                       :selected="item.selected">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职务：">
                        <el-select v-model="submitDuty" placeholder="请选择职务">
                            <el-option :label="item.label"
                                       :key="item.value"
                                       :value="item.value"
                                       v-for="item in personData.duty"
                                       :selected="item.selected">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人员性质：">
                        <el-select v-model="submitProperty" placeholder="请选择人员性质">
                            <el-option :label="item.label"
                                       :key="item.value"
                                       :value="item.value"
                                       v-for="item in personData.property"
                                       :selected="item.selected">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <el-input v-model="personData.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯：">
                        <el-input v-model="personData.nativeplace"></el-input>
                    </el-form-item>
                    <el-form-item label="所属单位：">
                        <el-select v-model="submitOrgid" placeholder="请选择人员性质">
                            <el-option :label="item.label"
                                       :key="item.value"
                                       :value="item.value"
                                       v-for="item in personData.orgid"
                                       :selected="item.selected">
                            </el-option>
                        </el-select>
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
                               @click="submitAddForm('personData')">
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

<script type="text/ecmascript-6">


    import TSearch from "../table/search.vue"
    import TPagination from "../table/pagination.vue"
    import axios from 'axios'
    import qs from 'qs'
    import {mapGetters} from 'vuex'


    //    var REST_MAIN = 'http://127.0.0.1/SmartBarracksPHP_Code/';
    var REST_MAIN = '/api/';
    var REST_UserLog_person = REST_MAIN + 'PersonInfo/person';
    var REST_UserLog_personAdd = REST_MAIN + 'PersonInfo/personAdd';
    var REST_UserLog_delete = REST_MAIN + 'PersonInfo/delete';
    var REST_UserLog_detail = REST_MAIN + 'PersonInfo/detail';
    var REST_UserLog_editDetail = REST_MAIN + 'PersonInfo/editDetail';
    var REST_UserLog_personEditl = REST_MAIN + 'PersonInfo/personEdit';
    var REST_UserLog_addDetail = REST_MAIN + 'PersonInfo/addDetail';
    var REST_UserLog_search = REST_MAIN + 'PersonInfo/person';


    export default {
        name: 'innerPerson',
        components: {
            TSearch,
            TPagination
        },
        created(){
            let _self = this;
            axios.get(REST_UserLog_person)
                .then(function (response) {
//                    console.log(response.data);
//                    console.log(_self.userData)
                    _self.userData = response.data.data;
                    _self.total = response.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        data() {
            return {
                search: '',
                currentPage: 1,
                pageSize: 10,
                total: 1,
                curIdx: 0,
                curRow: '',
                changeMSG: false,
                dialogVisible: false,
                addPerson: false,
                userData: [],
                personData: {},
                //form数据上传值
                submitPidType: '',
                submitNation: '',
                submitLevel: '',
                submitDuty: '',
                submitOrgid: '',
                submitProperty: '',
                personEditData: {},
                personSubmitData: {},
                personMoreData: {},
                nation: [{value: "1", label: "汉族", selected: true}, {value: "2", label: "蒙古族", selected: false}],
                multipleSelection: []
            }
        },
        computed: {
            ...mapGetters([
                'getToken'
            ])
        },
        methods: {
//            重置页面
            searchMsg(val){
                this.search = val;
                axios.post(REST_UserLog_search, qs.stringify({
                    search: val
                })).then(res => {
//                    console.log(response.data);
//                    console.log(_self.userData)
                    this.currentPage = 1;
                    if (res.data.state === '3010100') {
                        this.userData = [];
                        this.total = 10;
                    } else {
                        this.userData = res.data.data;
                        this.total = res.data.total;
                    }

                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getSelected(dataArr){
                let arr = dataArr.filter((val, idx) => {
                    return val.selected
                });
                return arr[0];
            },
            openMSG(msg) {
                this.$alert(msg, '信息提示', {
                    confirmButtonText: '确定'
                })
            },
            getPage(page){
                let _self = this;
                const getSearch = this.search ? `search/${this.search}`: '';
                axios.get(`${REST_UserLog_person}/p/${page}/${getSearch}`)
                    .then(function (response) {
//                        console.log(response.data);
//                    console.log(_self.userData)
                        _self.userData = response.data.data;
                        _self.total = response.data.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//          获取多选项
            handleSelectionChange(val) {
                let Arr = [];
                val.forEach(function (el) {
                    Arr.push(el);
                })
                this.multipleSelection = Arr;
//                console.log(this.multipleSelection);
            },
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
            deleteRow(index, rows){
                let _self = this;
                this.$confirm('此操作将永久删除选中人员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(REST_UserLog_delete, qs.stringify({
                            pid: rows[index].pid
                        })
                    ).then(function (response) {
                        _self.getPage(_self.currentPage);
                    }).catch(function (error) {
                        console.log(error);
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteAllSelection(data){
                let _self = this;
                let selectionArr = [];
                this.multipleSelection.forEach(function (val, idx) {
                    selectionArr.push(val.pid)
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
                    axios.post(REST_UserLog_delete, qs.stringify({
                            pid: selectionArr
                        })
                    )
                        .then(function (response) {
//                            console.log(response)
                            if (response.data.state === '303100') {
                                _self.getPage(_self.currentPage);
                                _self.$message({
                                    message: response.data.msg
                                });
                            } else {
//                                alert("1")
                                _self.deleteAllSelectionFn(data);
                                _self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
//          control the modal show
            detailMore(index, row){
                this.curIdx = index;
                this.curRow = row;
                this.dialogVisible = true;
                this.changeMSG = false;

                let _self = this;

                axios.get(`${REST_UserLog_detail}/pid/${row.pid}`)
                    .then(function (res) {
                        _self.personMoreData = res.data;
//                        console.log(res);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                axios.get(`${REST_UserLog_editDetail}/pid/${_self.curRow.pid}`)
                    .then(function (res) {
                        _self.personEditData = res.data;
                        _self.submitPidType = _self.getSelected(res.data.pidtype).value;
                        _self.submitNation = _self.getSelected(res.data.nation).value;
                        _self.submitLevel = _self.getSelected(res.data.level).value;
                        _self.submitDuty = _self.getSelected(res.data.duty).value;
                        _self.submitProperty = _self.getSelected(res.data.property).value;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            editDetailFn(){
                this.changeMSG = true;
            },
            resetForm(formName){
                this.addPerson = false;
//                解决在未知情况下无法获取Fields
//                console.log(this.$refs[formName]);
                for (let val in this.$refs[formName].model) {
                    this.personData[val] = "";
                }
            },
            submitEditForm(formName){
                this.dialogVisible = false;
                let _self = this;
                //set the editData
                this.personEditData.pidtype = _self.submitPidType;
                this.personEditData.nation = _self.submitNation;
                this.personEditData.level = _self.submitLevel;
                this.personEditData.duty = _self.submitDuty;
                this.personEditData.property = _self.submitProperty;

                axios.post(REST_UserLog_personEditl, qs.stringify(_self.personEditData))
                    .then(function (response) {
                        //清空数据
                        if (response.data.state === '307101') {
                            _self.$alert('修改成功', '消息提示', {
                                    confirmButtonText: '确定',
                                    callback: () => {
                                        _self.getPage(_self.currentPage);
                                    }
                                }
                            )
                        } else {
                            _self.$alert('修改失败', '消息提示', {
                                    confirmButtonText: '确定'
                                }
                            )
                        }
//                        console.log(response.data)
                        _self.submitPidType = '';
                        _self.submitNation = '';
                        _self.submitLevel = '';
                        _self.submitDuty = '';
                        _self.submitProperty = '';
//                        console.log(response);
                    })
                    .catch(function (error) {
                        _self.$alert(error, '消息提示', {
                                confirmButtonText: '确定'
                            }
                        )
                    });
            },
            getPageEvent(page){
                this.getPage(page);
            },
            addPersonFn(){
                this.addPerson = true;

                let _self = this;
                axios.get(REST_UserLog_addDetail)
                    .then(function (res) {
                        _self.personData = res.data;
                        console.log(res.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            submitAddForm(){
                this.addPerson = false;
                let _self = this;
                axios.post(REST_UserLog_personAdd, qs.stringify(_self.personData))
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
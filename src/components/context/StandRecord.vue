<template>
    <div class="table-group">
        <div class="t-btn">
            <el-button @click="deleteAllSelection('userData')">批量删除</el-button>
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
                    label="站岗人员姓名">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="orgname"
                    label="所属单位">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="date"
                    label="站岗日期">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="standstarttime"
                    label="站岗开始时间段">
            </el-table-column>
            <el-table-column
                    :sortable=true
                    header-align="center"
                    prop="standendtime"
                    label="站岗结束时间段">
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
                :title="`${curRow.name}外出记录`"
                v-model="detailsDialog"
                size="tiny"
                @close="resetData('userData','personMoreData')">
            <div class="dialog-context"
                 style="position: relative; padding: 20px;">
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
            <div slot="footer"
                 class="dialog-footer">
            </div>
        </el-dialog>

    </div>
</template>
<script>


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
                        'id':'string',//id主键
                        'name':'string',//站岗人员姓名
                        'date':'string',//站岗日期
                        'standstarttime':'string',//站岗开始时间段
                        'standendtime':'string',//站岗结束时间段
                        'orgname':'string',//所属单位
                        'remark':'string',//备注
                    },
                    {
                        'id':'string',//id主键
                        'name':'string',//站岗人员姓名
                        'date':'string',//站岗日期
                        'standstarttime':'string',//站岗开始时间段
                        'standendtime':'string',//站岗结束时间段
                        'orgname':'string',//所属单位
                        'remark':'string',//备注
                    },
                    {
                        'id':'string',//id主键
                        'name':'string',//站岗人员姓名
                        'date':'string',//站岗日期
                        'standstarttime':'string',//站岗开始时间段
                        'standendtime':'string',//站岗结束时间段
                        'orgname':'string',//所属单位
                        'remark':'string',//备注
                    },
                    {
                        'id':'string',//id主键
                        'name':'string',//站岗人员姓名
                        'date':'string',//站岗日期
                        'standstarttime':'string',//站岗开始时间段
                        'standendtime':'string',//站岗结束时间段
                        'orgname':'string',//所属单位
                        'remark':'string',//备注
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

</style>
<template>
  <div class="app-container">
    <div class="filter-container">
      <span>快速查询：</span>
      <el-input
        class="input-search"
        v-model="searchKey"
        placeholder="请输入小区名称"
        clearable
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-button type="primary" @click="onLoadHousingEstateData"
        >搜索</el-button
      >
      <el-button @click="onReset">重置</el-button>
      <div class="flex-1"></div>
      <el-button type="success" @click="onHousingEstateAdd">新增</el-button>
    </div>
    <el-table
      :key="housingEstateListKey"
      :data="housingEstateList"
      border
      fit
      highlight-current-row
      style="width: 100%"
      v-loading="housingEstateListLoading"
    >
      <el-table-column prop="province" label="省" min-width="100">
      </el-table-column>
      <el-table-column prop="city" label="市" min-width="100">
      </el-table-column>
      <el-table-column prop="region" label="区" min-width="100">
      </el-table-column>
      <el-table-column prop="houseName" label="小区名称" min-width="200">
      </el-table-column>
      <el-table-column prop="houseAddr" label="小区地址" min-width="200">
      </el-table-column>
      <el-table-column prop="housePhone" label="小区联系电话" min-width="120">
      </el-table-column>
      <el-table-column
        prop="houseContractorName"
        label="小区联系人"
        min-width="120"
      >
      </el-table-column>
      <el-table-column prop="operationsName" label="运维负责人" min-width="120">
      </el-table-column>
      <el-table-column
        prop="operationsPhone"
        label="运维负责人电话"
        min-width="120"
      >
      </el-table-column>
      <el-table-column prop="createTime" label="加入时间" min-width="160">
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="operation"
        label="操作"
        min-width="250"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="onHousingEstateEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="onShowAddBikeShedDialog(scope.$index, scope.row)"
            >新增车棚</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="onHousingEstateDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageNo"
      :limit.sync="pageSize"
      @pagination="onLoadHousingEstateData"
    />

    <el-dialog title="新增小区" :visible.sync="isShowDialogAddHousingEstate">
      <el-form
        ref="addHousingEstateRef"
        :rules="addHousingEstateRules"
        :model="NewHousingEstate"
        label-position="right"
        label-width="140px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="小区所在省：" prop="province">
          <el-select
            v-model="NewHousingEstate.province"
            class="filter-item"
            placeholder="请选择所在省份"
            v-bind:disabled="dialogStatus == 'update'"
            @change="onProvinceSelectChange"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="小区所在市：" prop="city">
          <el-select
            v-model="NewHousingEstate.city"
            class="filter-item"
            placeholder="请选择所在市"
            v-bind:disabled="dialogStatus == 'update'"
            @change="onCitySelectChange"
          >
            <el-option
              v-for="item in cityList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="小区所在区：" prop="region">
          <el-select
            v-model="NewHousingEstate.region"
            class="filter-item"
            v-bind:disabled="dialogStatus == 'update'"
            placeholder="请选择所在区"
          >
            <el-option
              v-for="item in regionList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="小区名字：" prop="houseName">
          <el-input
            v-model="NewHousingEstate.houseName"
            placeholder="请输入小区名字"
            clearable
          />
        </el-form-item>
        <el-form-item label="小区地址：" prop="houseAddr">
          <el-input
            v-model="NewHousingEstate.houseAddr"
            placeholder="请输入小区地址"
            clearable
          />
        </el-form-item>
        <el-form-item label="小区联系电话：" prop="housePhone">
          <el-input
            v-model="NewHousingEstate.housePhone"
            placeholder="请输入小区联系电话"
            maxlength="12"
            clearable
          />
        </el-form-item>
        <el-form-item label="小区负责人：" prop="houseContractorName">
          <el-input
            v-model="NewHousingEstate.houseContractorName"
            placeholder="请输入小区负责人姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="运维负责人：" prop="operationsName">
          <el-input
            v-model="NewHousingEstate.operationsName"
            placeholder="请输入运维负责人姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="运维负责人电话：" prop="operationsPhone">
          <el-input
            v-model="NewHousingEstate.operationsPhone"
            placeholder="请输入运维负责人电话"
            maxlength="12"
            clearable
          />
        </el-form-item>
        <el-form-item label="备注：" prop="bak">
          <el-input
            v-model="NewHousingEstate.bak"
            placeholder="请输入备注"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialogAddHousingEstate = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="
            dialogStatus === 'add'
              ? onAddHousingEstate()
              : onUpdateHousingEstate()
          "
        >
          添加
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增车棚" :visible.sync="isShowDialogAddBikeShed">
      <el-form
        ref="addBikeShedRef"
        :rules="addBikeShedRules"
        :model="NewBikeShed"
        label-position="right"
        label-width="140px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="所属小区：" prop="houseName">
          <el-input v-model="NewBikeShed.houseName" disabled clearable />
        </el-form-item>
        <el-form-item label="车棚名称：" prop="carName">
          <el-input
            v-model="NewBikeShed.carName"
            placeholder="请输入车棚名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="车棚地址：" prop="carAddress">
          <el-input
            v-model="NewBikeShed.carAddress"
            placeholder="请输入车棚地址"
            clearable
          />
        </el-form-item>
        <el-form-item label="车棚负责人电话：" prop="operationsPhone">
          <el-input
            v-model="NewBikeShed.operationsPhone"
            placeholder="请输入车棚负责人电话"
            maxlength="12"
            clearable
          />
        </el-form-item>
        <el-form-item label="车棚负责人：" prop="operationsName">
          <el-input
            v-model="NewBikeShed.operationsName"
            placeholder="请输入车棚负责人姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="备注：" prop="bak">
          <el-input
            v-model="NewBikeShed.bak"
            placeholder="请输入备注"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialogAddBikeShed = false">
          取消
        </el-button>
        <el-button type="primary" @click="onAddBikeShed()">
          添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { getToken } from "@/utils/auth";

import {
  queryRegionHousePage, //加载小区列表
  queryAllProvince, //加载省
  queryCityByProvince, //加载市
  queryRegionByCity, //加载区
  saveRegionHouse, //新增小区
  delRegionHouse, //删除小区
  updateRegionHouse, //更新小区
  addCarPort //新增车棚
} from "@/api/basics/housingEstate";

export default {
  name: "HousingEstate",
  data() {
    return {
      searchKey: "", //搜索关键字
      housingEstateListLoading: true, //表单加载状态控制
      total: 0, //总页数
      pageSize: 10, //分页大小
      pageNo: 1, //分页页码
      housingEstateList: null, //小区集合
      housingEstateListKey: 0, //更新列表的key
      provinceList: null, //省份集合
      cityList: null, //省份下市集合
      regionList: null, //市下面区域集合
      dialogStatus: "", //小区对话框状态  add: 新增 | update:更新
      isShowDialogAddHousingEstate: false, //是否显示新增小区对话框
      addHousingEstateRules: {
        //新增小区表单验证规则
        province: [
          { required: true, message: "请选择所在省份", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择所在市", trigger: "change" }],
        region: [
          { required: true, message: "请选择所在区", trigger: "change" }
        ],
        houseName: [
          { required: true, message: "请输入小区名称", trigger: "blur" }
        ],
        houseAddr: [
          { required: true, message: "请输入小区地址", trigger: "blur" }
        ],
        housePhone: [
          { required: true, message: "请输入小区联系电话", trigger: "blur" }
        ],
        houseContractorName: [
          { required: true, message: "请输入小区联系人姓名", trigger: "blur" }
        ],
        operationsName: [
          { required: true, message: "请输入运维负责人姓名", trigger: "blur" }
        ],
        operationsPhone: [
          { required: true, message: "请输入运维负责人电话", trigger: "blur" }
        ]
      },
      NewHousingEstate: {}, //新增小区默认对象
      isShowDialogAddBikeShed: false, //是否显示新增车棚对话框
      addBikeShedRules: {
        //新增车棚表单验证规则
        carName: [
          { required: true, message: "请输入车棚名称", trigger: "blur" }
        ],
        carAddress: [
          { required: true, message: "请输入车棚地址", trigger: "blur" }
        ],
        operationsPhone: [
          {
            required: true,
            message: "请输入车棚运维负责人电话",
            trigger: "blur"
          }
        ],
        operationsName: [
          {
            required: true,
            message: "请输入车棚运维负责人姓名",
            trigger: "blur"
          }
        ]
      },
      NewBikeShed: {} //新增车棚对象
    };
  },
  components: { Pagination },
  mounted() {},
  created() {
    //加载小区
    this.onLoadHousingEstateData();
    //加载省份
    this.onLoadAllProvinceData(false);
  },
  methods: {
    /**获取小区列表 */
    onLoadHousingEstateData() {
      var that = this;

      var queryData = {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      };

      if (!this.isEmpty(this.searchKey)) {
        queryData.houseName = this.searchKey;
      }
      this.housingEstateListLoading = true;
      queryRegionHousePage(queryData)
        .then(result => {
          that.housingEstateListLoading = false;
          that.total = result.count; //统计总数
          if (!that.isEmpty(result.rows)) {
            result.rows.forEach(item => {
              item.createTime = that.timeStampToStr(item.createTime, "-");
            });
          }
          that.housingEstateList = result.rows;
        })
        .catch(err => {
          that.housingEstateListLoading = false;
        });
    },

    /**编辑小区资料 */
    onHousingEstateEdit(index, item) {
      this.dialogStatus = "update";
      this.isShowDialogAddHousingEstate = true;
      this.NewHousingEstate = item;
      //清空验证信息
      this.$nextTick(() => {
        this.$refs["addHousingEstateRef"].clearValidate();
      });
    },

    /**新增小区资料 */
    onHousingEstateAdd() {
      //清除之前的对象
      this.NewHousingEstate = {};
      //先判断省份是否加载完成
      if (!this.isEmpty(this.provinceList)) {
        this.dialogStatus = "add";
        this.isShowDialogAddHousingEstate = true;
      } else {
        this.onLoadAllProvinceData(true);
      }
      //清空验证信息
      this.$nextTick(() => {
        this.$refs["addHousingEstateRef"].clearValidate();
      });
    },

    /**新增小区 */
    onAddHousingEstate() {
      var that = this;
      this.$refs["addHousingEstateRef"].validate(valid => {
        if (valid) {
          var queryData = {
            province: that.NewHousingEstate.province,
            city: that.NewHousingEstate.city,
            region: that.NewHousingEstate.region,
            houseName: that.NewHousingEstate.houseName,
            houseAddr: that.NewHousingEstate.houseAddr,
            housePhone: that.NewHousingEstate.housePhone,
            houseContractorName: that.NewHousingEstate.houseContractorName,
            operationsName: that.NewHousingEstate.operationsName,
            operationsPhone: that.NewHousingEstate.operationsPhone,
            bak: that.NewHousingEstate.bak
          };

          saveRegionHouse(queryData).then(result => {
            that.housingEstateList.unshift(this.NewHousingEstate);
            that.isShowDialogAddHousingEstate = false;
            this.$notify({
              title: "温馨提示",
              message: "小区添加成功!",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },

    /**更新小区 */
    onUpdateHousingEstate() {
      var that = this;

      var token = getToken();
      this.$refs["addHousingEstateRef"].validate(valid => {
        if (valid) {
          var queryData = {
            id: that.NewHousingEstate.id,
            province: that.NewHousingEstate.province,
            city: that.NewHousingEstate.city,
            region: that.NewHousingEstate.region,
            houseName: that.NewHousingEstate.houseName,
            houseAddr: that.NewHousingEstate.houseAddr,
            housePhone: that.NewHousingEstate.housePhone,
            houseContractorName: that.NewHousingEstate.houseContractorName,
            operationsName: that.NewHousingEstate.operationsName,
            operationsPhone: that.NewHousingEstate.operationsPhone,
            bak: that.NewHousingEstate.bak
          };

          updateRegionHouse(queryData, token).then(result => {
            const index = that.housingEstateList.findIndex(
              v => v.id === that.NewHousingEstate.id
            );
            that.housingEstateList.splice(index, 1, that.NewHousingEstate);
            that.isShowDialogAddHousingEstate = false;
            that.$notify({
              title: "温馨提示",
              message: "小区更新成功!",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },

    /**删除小区 */
    onHousingEstateDelete(index, item) {
      var that = this;

      this.$confirm("是否删除该小区信息?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var queryData = {
            regionHouseId: item.id
          };
          delRegionHouse(queryData).then(result => {
            that.housingEstateList.splice(index, 1);
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },

    /**显示新增车棚对话框 */
    onShowAddBikeShedDialog(index, item) {
      this.isShowDialogAddBikeShed = true;
      this.NewHousingEstate = item;
      this.NewBikeShed = {
        regionHouseId: item.id,
        houseName: item.houseName
      };
      //清空验证信息
      this.$nextTick(() => {
        this.$refs["addBikeShedRef"].clearValidate();
      });
    },

    /**新增车棚 */
    onAddBikeShed() {
      var that = this;
      this.$refs["addBikeShedRef"].validate(valid => {
        if (valid) {
          var queryData = {
            regionHouseId: that.NewBikeShed.regionHouseId, //小区 ID
            regionHouseName: that.NewBikeShed.regionHouseName, //小区名称
            carName: that.NewBikeShed.carName, //车棚名称
            carAddress: that.NewBikeShed.carAddress, //车棚地址
            operationsPhone: that.NewBikeShed.operationsPhone, //车棚运维负责人电话
            operationsName: that.NewBikeShed.operationsName, //车棚运维负责人姓名
            bak: that.NewBikeShed.bak //备注
          };

          addCarPort(queryData).then(result => {
            that.isShowDialogAddBikeShed = false;
            this.$notify({
              title: "温馨提示",
              message: "新增车棚成功!",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },

    /**加载所有省份 */
    onLoadAllProvinceData(isShowDialog) {
      var that = this;
      queryAllProvince().then(result => {
        that.provinceList = result.data;
        if (isShowDialog) {
          that.onHousingEstateAdd();
        }
      });
    },

    /**所在省变动监听 */
    onProvinceSelectChange(provinceId) {
      var that = this;

      if (!this.isEmpty(provinceId)) {
        var queryData = {
          provinceId: provinceId
        };
        queryCityByProvince(queryData).then(result => {
          that.cityList = result.data;
        });
      }
    },

    /**所在市变动监听 */
    onCitySelectChange(cityId) {
      var that = this;

      if (!this.isEmpty(cityId)) {
        var queryData = {
          cityId: cityId
        };

        queryRegionByCity(queryData).then(result => {
          that.regionList = result.data;
        });
      }
    },

    /**重置按钮 */
    onReset() {
      this.searchKey = "";
    }
  }
};
</script>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
}

.input-search {
  width: 20vw;
  margin-right: 3vw;
}
</style>
